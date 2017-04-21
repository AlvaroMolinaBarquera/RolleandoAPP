import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';


import { ArchModule } from './../arch/arch.module';

import { TolsDiceRoller }  from './tols-dice-roller/tols.dice-roller.component';
import { TolsInitiativeTracker }  from './tols-initiative-tracker/tols.initiative-tracker.component';
import { TolsRandomNameGenerator } from './tols-random-name-generator/tols.random-name-generator.component';
import { TolsRoutingModule } from './tols.routing.module';

@NgModule({
  imports:      [ BrowserModule, FormsModule, ArchModule, HttpModule, TolsRoutingModule  ],
  declarations: [ TolsDiceRoller , TolsInitiativeTracker, TolsRandomNameGenerator],
  exports:      [ TolsDiceRoller , TolsInitiativeTracker, TolsRandomNameGenerator ],
})
export class TolsModule { }
