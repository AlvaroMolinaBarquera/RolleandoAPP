import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { ArchModule } from './../arch/arch.module';

import {TestComponent} from './test.component';
import {TestTable } from './test-table/test.table.component';

import { TestRoutingModule } from './test.routing.module';

@NgModule({
  imports:      [ BrowserModule, FormsModule, NgbModule, ArchModule, HttpModule, TestRoutingModule ],
  declarations: [ TestComponent, TestTable ],
  exports:      [ TestComponent ],
})
export class TestModule { }
