import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuentaCobrarCreateComponent } from './cuenta-cobrar-create/cuenta-cobrar-create.component';
import { CuentaCobrarListComponent } from './cuenta-cobrar-list/cuenta-cobrar-list.component';

const routes: Routes = [
  {
    path: '',
    component: CuentaCobrarListComponent
  },
  {
    path: 'crear',
    component: CuentaCobrarCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuentaCobrarRoutingModule { }
