import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routing.module';
import { AppComponent }  from './app.component';


import { ArchModule } from './arch/arch.module';
import { TolsModule } from './tols/tols.module';
import { AnbfModule} from './anbf/anbf.module';

import { AppError404 } from './app.error-404.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports:      [
    BrowserModule,
    ArchModule,
    TolsModule,
    AnbfModule,
    NgbModule.forRoot(),
    AppRoutingModule // Debe ir el ultimo,
    ],
  declarations: [ AppComponent, AppError404 ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
