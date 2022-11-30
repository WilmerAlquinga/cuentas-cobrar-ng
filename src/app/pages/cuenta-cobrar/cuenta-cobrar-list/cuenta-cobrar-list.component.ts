import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Cobro } from 'src/app/models/Cobro.types';
import { CuentasCobrarService } from 'src/app/services/cuentas-cobrar.service';

@Component({
  selector: 'app-cuenta-cobrar-list',
  templateUrl: './cuenta-cobrar-list.component.html',
  styleUrls: ['./cuenta-cobrar-list.component.css']
})
export class CuentaCobrarListComponent implements OnInit {
  cobros: Cobro[] = [];
  cobro: Cobro;
  id_cobro: number;
  submitted: boolean;
  cobroDialog: boolean;
  @ViewChild('dt') dt: Table | undefined;

  constructor(
    private cobroService: CuentasCobrarService,
    private confirmationService: ConfirmationService,
    private router: Router
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
      console.log(this.cobros);
      
    });
  }

  save() {}

  editCobro(cobro: Cobro) {}

  deleteCobro(cobro: Cobro) {}

  newDetail(cobro: Cobro) {}

  new() {
    this.router.navigate(['/cuentas-cobrar/crear']);
  }

  hideDialog() {
    this.cobroDialog = false;
    this.submitted = false;
  }

}
