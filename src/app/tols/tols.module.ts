import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { ArchModule } from './../arch/arch.module';
import { TolsDiceRoller }  from './tols-dice-roller/tols.dice-roller.component';
import { TolsInitiativeTracker }  from './tols-initiative-tracker/tols.initiative-tracker.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, ArchModule ],
  declarations: [ TolsDiceRoller , TolsInitiativeTracker],
  exports:      [ TolsDiceRoller , TolsInitiativeTracker ],
})
export class TolsModule { }
