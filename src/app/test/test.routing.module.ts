import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TestTable } from './test-table/test.table.component';
import { TestModal } from './test-modal/test.modal.component';
import { TestTransactions } from './test-transactions/test.transactions.component';
import { TestTraces } from './test-traces/test.traces.component';
import { TestExcel } from './test-excel/test.excel.component';
import { TestComponent} from './test.component';
import { TestNavigatioOne, TestNavigatioTwo } from './test-navigation/test.navigation.component';

const testRoutes: Routes = [
  {
    path: 'test',
    component: TestComponent,
  }, {
    path: 'test/test-table',
    component: TestTable,
    name: 'testTable',
  }, {
    path: 'test/test-modal',
    component: TestModal
  }, {
    path: 'test/test-transactions',
    component: TestTransactions
  }, {
    path: 'test/test-traces',
    component: TestTraces
  },
  {
    path: 'test/test-excel',
    component: TestExcel,
  },
  {
    path: 'test/test-navigation-one',
    sticky: true,
    component: TestNavigatioOne,
    name: 'testNavigationOne'
  },
  {
    path: 'test/test-navigation-two',
    sticky: true,
    component: TestNavigatioTwo,
    name: 'testNavigationTwo'
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
