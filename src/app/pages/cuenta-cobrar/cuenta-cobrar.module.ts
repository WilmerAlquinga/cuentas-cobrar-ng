import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { FormsModule } from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextModule} from 'primeng/inputtext';
import {TooltipModule} from 'primeng/tooltip';

import { CuentaCobrarRoutingModule } from './cuenta-cobrar-routing.module';
import { CuentaCobrarCreateComponent } from './cuenta-cobrar-create/cuenta-cobrar-create.component';
import { CuentaCobrarListComponent } from './cuenta-cobrar-list/cuenta-cobrar-list.component';
import { ToolbarModule } from 'primeng/toolbar';


@NgModule({
  declarations: [
    CuentaCobrarCreateComponent,
    CuentaCobrarListComponent
  ],
  imports: [
    CommonModule,
    CuentaCobrarRoutingModule,
    ToolbarModule,
    TableModule,
    ButtonModule,
    RippleModule,
    ConfirmDialogModule,
    FormsModule,
    DialogModule,
    InputNumberModule,
    InputTextModule,
    TooltipModule
  ]
})
export class CuentaCobrarModule { }
