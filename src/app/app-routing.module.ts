import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CobradorComponent } from './pages/cobrador/cobrador.component';
import { FormaPagoComponent } from './pages/forma-pago/forma-pago.component';

const routes: Routes = [
  {
    path: 'cobradores',
    component: CobradorComponent
  },
  {
    path: 'formas-de-pago',
    component: FormaPagoComponent
  },
  {
    path: 'cuentas-cobrar',
    loadChildren: () => import('./pages/cuenta-cobrar/cuenta-cobrar.module').then(m => m.CuentaCobrarModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
