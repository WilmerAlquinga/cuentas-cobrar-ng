import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { FormaPago } from 'src/app/models/FormaPago.types';
import { FormaPagoService } from 'src/app/services/forma-pago.service';

@Component({
  selector: 'app-forma-pago',
  templateUrl: './forma-pago.component.html',
  styleUrls: ['./forma-pago.component.css']
})
export class FormaPagoComponent implements OnInit {
  formasPago: FormaPago[] = [];
  formaPago: FormaPago;
  formaPagoDialog: boolean;
  submitted: boolean;
  @ViewChild('dt') dt: Table | undefined;

  constructor(
    private formaPagoService: FormaPagoService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  getAll() {
    this.formaPagoService.getAll().subscribe((res) => {
      this.formasPago = res;
    });
  }

  save() {
    this.submitted = true;
    this.formasPago = [];
    // Editar
    if (this.formaPago.id_forma_de_pago) {
      this.formaPagoService.update(this.formaPago).subscribe((res) => {
        this.formaPagoDialog = false;
        this.formaPago = {} as FormaPago;
        this.getAll();
      });
      // Crear
    } else {
      this.formaPagoService.create(this.formaPago).subscribe((res) => {
        this.formaPagoDialog = false;
        this.formaPago = {} as FormaPago;
        this.getAll();
      });
    }
  }

  update() {
    this.formaPagoService.update(this.formaPago).subscribe((res) => {
      console.log('Forma de Pago actualizado correctamente');
    });
  }

  delete(id: number) {
    this.formaPagoService.delete(id).subscribe((res) => {
      this.formasPago = [];
      this.getAll();
    });
  }

  new() {
    this.formaPago = {} as FormaPago;
    this.submitted = false;
    this.formaPagoDialog = true;
  }

  editFormaPago(formaPago: FormaPago) {
    this.formaPago = { ...formaPago };
    this.formaPagoDialog = true;
  }

  deleteFormaPago(formaPago: FormaPago) {
    this.confirmationService.confirm({
      message: 'Está seguro de eliminar la forma de pago: ' + formaPago.nombre + '?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.delete(formaPago.id_forma_de_pago);
      },
    });
  }

  hideDialog() {
    this.formaPagoDialog = false;
    this.submitted = false;
  }

}
