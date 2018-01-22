import { Component } from '@angular/core';

@Component({
  selector: 'test-component',
  template: `<h1>Componente de Pruebas</h1>
  <a routerLink="test-table"> Componente Tabla </a>
  <a routerLink="test-modal"> Componente Modal </a><router-outlet></router-outlet>
  <a routerLink="test-transactions"> Servicio Transacciones </a>
  <a routerLink="test-traces"> Servicio Trazas </a>
  <a routerLink="test-excel"> Servicio Excel </a>
  
  <router-outlet></router-outlet>
  `,
})
export class TestComponent  {}
