import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { CuentasCobrarService } from 'src/app/services/cuentas-cobrar.service';
import { Cobro } from '../../../models/Cobro.types';
import { CobradorService } from '../../../services/cobrador.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-listar-cobros',
  templateUrl: './listar-cobros.component.html',
  styleUrls: ['./listar-cobros.component.css']
})
export class ListarCobrosComponent implements OnInit {
  cobros: Cobro[] = [];
  cobro: Cobro;
  id_cobro: number;
  submitted: boolean;
  cobroDialog: boolean;
  @ViewChild('dt') dt: Table | undefined;

  constructor(
    private cobroService: CuentasCobrarService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  getAll() {
    this.cobroService.getAll().subscribe((res) => {
      this.cobros = res;
    });
  }

  getById() {
    this.cobroService.getById(this.id_cobro).subscribe(res => {
      this.cobro = res;
    });
  }

  delete(id: number) {
    this.cobroService.delete(id).subscribe((res) => {
      this.cobros = [];
      this.getAll();
    });
  }

  new() {
    this.cobro = {} as Cobro;
    this.submitted = false;
    this.cobroDialog = true;
  }

  editCobro(cobro: Cobro) {
    this.cobro = { ...cobro };
    this.cobroDialog = true;
  }

  deleteCobro(cobro: Cobro) {
    this.confirmationService.confirm({
      message: 'Está seguro de eliminar el cobro de la factura: ' + cobro.numero_factura + '?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.delete(cobro.id_cobro);
      },
    });
  }

  hideDialog() {
    this.cobroDialog = false;
    this.submitted = false;
  }

}
