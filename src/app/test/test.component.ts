import { Component } from '@angular/core';

@Component({
  selector: 'test-component',
  templateUrl: './test.view.html',
})
export class TestComponent  {
  SERVICES_ARRAY: Array<{text: string; path: string}> = [
    {
      text: 'Trazas',
      path: 'test-traces'
    },
    {
      text: 'Excel',
      path: 'test-excel'
    },
    {
      text: 'Transacciones',
      path: 'test-transactions'
    },
    {
      text: 'Modal',
      path: 'test-modal'
    } 
  ];
  COMPONENTS_ARRAY: Array<{text: string; path: string}> = [
    {
      text: 'Tabla',
      path: 'test-table'
    }
  ];
}
