import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  items: MenuItem[];

  constructor() {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Cobrador',
        icon: 'pi pi-fw pi-user',
        routerLink: '/cobradores',
      },
      {
        label: 'Formas de Pago',
        icon: 'pi pi-fw pi-dollar',
        routerLink: '/formas-de-pago',
      },
      {
        label: 'Cuentas por Cobrar',
        icon: 'pi pi-fw pi-calendar',
        routerLink: '/cuentas-cobrar',
      },
    ];
  }
}
