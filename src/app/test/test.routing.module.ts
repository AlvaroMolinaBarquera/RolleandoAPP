import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TestTable } from './test-table/test.table.component';
import { TestComponent} from './test.component';

const testRoutes: Routes = [
  {
    path: 'test',
    component: TestComponent,
  },{
    path: 'test/test-table',
    component: TestTable
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
