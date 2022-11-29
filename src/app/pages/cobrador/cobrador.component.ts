import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Cobrador } from '../../models/Cobrador.types';
import { CobradorService } from '../../services/cobrador.service';

@Component({
  selector: 'app-cobrador',
  templateUrl: './cobrador.component.html',
  styleUrls: ['./cobrador.component.css'],
})
export class CobradorComponent implements OnInit {
  cobradores: Cobrador[] = [];
  cobrador: Cobrador;
  cobradorDialog: boolean;
  submitted: boolean;
  @ViewChild('dt') dt: Table | undefined;

  constructor(
    private cobradorService: CobradorService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  getAll() {
    this.cobradorService.getAll().subscribe((res) => {
      this.cobradores = res;
    });
  }

  save() {
    this.submitted = true;
    this.cobradores = [];
    // Editar
    if (this.cobrador.id_cobrador) {
      this.cobradorService.update(this.cobrador).subscribe((res) => {
        this.cobradorDialog = false;
        this.cobrador = {} as Cobrador;
        this.getAll();
      });
      // Crear
    } else {
      this.cobradorService.create(this.cobrador).subscribe((res) => {
        this.cobradorDialog = false;
        this.cobrador = {} as Cobrador;
        this.getAll();
      });
    }
  }

  update() {
    this.cobradorService.update(this.cobrador).subscribe((res) => {
      console.log('Cobrador actualizado correctamente');
    });
  }

  delete(id: number) {
    this.cobradorService.delete(id).subscribe((res) => {
      this.cobradores = [];
      this.getAll();
    });
  }

  new() {
    this.cobrador = {} as Cobrador;
    this.submitted = false;
    this.cobradorDialog = true;
  }

  editCobrador(cobrador: Cobrador) {
    this.cobrador = { ...cobrador };
    this.cobradorDialog = true;
  }

  deleteCobrador(cobrador: Cobrador) {
    this.confirmationService.confirm({
      message: 'Está seguro de eliminar el cobrador: ' + cobrador.nombre + '?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.delete(cobrador.id_cobrador);
      },
    });
  }

  hideDialog() {
    this.cobradorDialog = false;
    this.submitted = false;
  }
}
