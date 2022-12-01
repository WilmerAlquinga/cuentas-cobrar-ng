import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Cobro } from 'src/app/models/Cobro.types';
import { CobroDetalle } from 'src/app/models/CobroDetalle.types';
import { FormaPago } from 'src/app/models/FormaPago.types';
import { CobradorService } from 'src/app/services/cobrador.service';
import { CuentasCobrarService } from 'src/app/services/cuentas-cobrar.service';
import { Cobrador } from '../../../models/Cobrador.types';
import { FormaPagoService } from '../../../services/forma-pago.service';
import { GuardarCobroDetalle } from '../../../models/CobroDetalle.types';

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
  cobradores: Cobrador[] = [];
  selectedCobrador: Cobrador;
  formasPago: FormaPago[] = [];
  selectedFormaPago: FormaPago;
  selectedCobro: Cobro;
  cobroDetalle: GuardarCobroDetalle = {} as GuardarCobroDetalle;
  descripcion: string;
  valor: number;
  @ViewChild('dt') dt: Table | undefined;
  totalPagado: number;

  constructor(
    private formaPagoService: FormaPagoService,
    private cobradorService: CobradorService,
    private cobroService: CuentasCobrarService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAll();
    this.getCobradores();
    this.getFormasPago();
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  getAll() {
    this.cobroService.getAll().subscribe((res) => {
      this.cobros = res;
    });
  }

  getCobradores() {
    this.cobradorService.getAll().subscribe(res => {
      this.cobradores = res;
    });
  }

  getFormasPago() {
    this.formaPagoService.getAll().subscribe(res => {
      this.formasPago = res;
    });
  }

  save() {
    const valorCobrado = this.totalPagado + this.valor;
    const valorPendiente = this.selectedCobro.valor_factura - this.totalPagado;
    const cobroDetalle: GuardarCobroDetalle = {
      id_cobro: this.selectedCobro.id_cobro,
      valor_cobrado: valorCobrado,
      valor_pendiente: valorPendiente,
      estado: valorPendiente <= 0 ? 'Pagado' : 'Pendiente',
      detail: {
        id_cobro_detalle: null,
        id_cobro: this.selectedCobro.id_cobro,
        id_forma_de_pago: this.selectedFormaPago.id_forma_de_pago,
        id_cobrador: this.selectedCobrador.id_cobrador,
        fecha: new Date(),
        forma_de_pago: this.selectedFormaPago.nombre,
        pago: this.descripcion,
        valor: this.valor,
        cobrador: this.selectedCobrador.nombre
      }
    };
    this.cobroService.createDetail(cobroDetalle).subscribe(res => {
      this.cobroDialog = false;
      this.cobro = {} as Cobro;
      this.getAll();
    });
  }

  getDetailsByCobroId(id: number) {
    this.totalPagado = 0;
    this.cobroService.getDetailsByCobroId(id).subscribe(res => {
      res.map(det => {
        this.totalPagado += det.valor;
      });
    });
  }

  editCobro(cobro: Cobro) {}

  deleteCobro(cobro: Cobro) {
    this.confirmationService.confirm({
      message: 'Está seguro de eliminar la Cuenta por Cobrar: ' + cobro.id_cobro + '?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.delete(cobro.id_cobro);
      },
    });
  }

  delete(id: number) {
    this.cobroService.delete(id).subscribe((res) => {
      this.cobros = [];
      this.getAll();
    });
  }

  newDetail(cobro: Cobro) {
    this.selectedCobro = cobro;
    this.getDetailsByCobroId(this.selectedCobro.id_cobro);
    this.cobroDetalle = {} as GuardarCobroDetalle;
    this.submitted = false;
    this.cobroDialog = true;
  }

  new() {
    this.router.navigate(['/cuentas-cobrar/crear']);
  }

  hideDialog() {
    this.cobroDialog = false;
    this.submitted = false;
  }

}
