import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { ArchModule } from './arch/arch.module';
import { TolsModule } from './tols/tols.module';
import { AnbfModule} from './anbf/anbf.module';

import { AppComponent }  from './app.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports:      [ BrowserModule, ArchModule, TolsModule, AnbfModule, NgbModule.forRoot() ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
