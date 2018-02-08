import { Component } from '@angular/core';
import { ArchTaskManagerService } from '../arch/services/arch-task-manager/arch.task-manager.service';
@Component({
  selector: 'test-component',
  templateUrl: './test.view.html',
})
export class TestComponent  {
  constructor (private taskManagerService: ArchTaskManagerService) {}
  SERVICES_ARRAY: Array<{text: string; name: string}> = [
    {
      text: 'Trazas',
      name: 'testTraces'
    },
    {
      text: 'Excel',
      name: 'testExcel'
    },
    {
      text: 'Transacciones',
      name: 'testTransactions'

    },
    {
      text: 'Modal',
      name: 'testModal'

    },
    {
      text: 'Eventos',
      name: 'testEvents'
    },
    {
      text: 'Navegacion',
      name: 'testNavigationOne'
    } 
  ];
  COMPONENTS_ARRAY: Array<{text: string; name: string}> = [
    {
      text: 'Tabla',
      name: 'testTable',
    }
  ];
}
