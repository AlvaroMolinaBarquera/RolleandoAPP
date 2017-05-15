import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TestTable } from './test-table/test.table.component';
import { TestModal } from './test-modal/test.modal.component';
import { TestComponent} from './test.component';

const testRoutes: Routes = [
  {
    path: 'test',
    component: TestComponent,
  },{
    path: 'test/test-table',
    component: TestTable
  }, {
    path: 'test/test-modal',
    component: TestModal
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(testRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class TestRoutingModule { }
