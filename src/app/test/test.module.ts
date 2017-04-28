import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {TestComponent} from './test.component';


@NgModule({
  imports:      [ BrowserModule, FormsModule, NgbModule, HttpModule ],
  declarations: [ TestComponent ],
  exports:      [ TestComponent ],
})
export class TestModule { }
