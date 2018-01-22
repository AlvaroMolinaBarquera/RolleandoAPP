import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { ArchModule } from './../arch/arch.module';

import {TestComponent} from './test.component';
import {TestTable } from './test-table/test.table.component';
import { TestModal } from './test-modal/test.modal.component';
import { TestTransactions } from './test-transactions/test.transactions.component';
import { TestTraces } from './test-traces/test.traces.component';
import { TestExcel } from './test-excel/test.excel.component';

import { TestRoutingModule } from './test.routing.module';

@NgModule({
  imports:      [ BrowserModule, FormsModule, NgbModule, ArchModule, HttpModule, TestRoutingModule ],
  declarations: [ TestComponent, TestTable, TestModal, TestTransactions, TestTraces, TestExcel ],
  exports:      [ TestComponent ],
})
export class TestModule {}
