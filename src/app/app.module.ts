import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import {TabViewModule} from 'primeng/tabview';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextModule} from 'primeng/inputtext';

import {ConfirmationService} from 'primeng/api';
import { CobradorComponent } from './pages/cobrador/cobrador.component';
import { FormaPagoComponent } from './pages/forma-pago/forma-pago.component';
import { ListarComponent } from './pages/cobros/listar/listar.component';
import { ListarCobrosComponent } from './pages/cobros/listar-cobros/listar-cobros.component';

@NgModule({
  declarations: [
    AppComponent,
    CobradorComponent,
    FormaPagoComponent,
    ListarComponent,
    ListarCobrosComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TabViewModule,
    HttpClientModule,
    ToolbarModule,
    TableModule,
    ButtonModule,
    RippleModule,
    ConfirmDialogModule,
    FormsModule,
    DialogModule,
    InputNumberModule,
    InputTextModule
  ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
