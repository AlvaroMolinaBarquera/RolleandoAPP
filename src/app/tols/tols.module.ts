import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';


import { ArchModule } from './../arch/arch.module';

import { TolsDiceRoller }  from './tols-dice-roller/tols.dice-roller.component';
import { TolsInitiativeTracker }  from './tols-initiative-tracker/tols.initiative-tracker.component';
import { TolsRandomNameGenerator } from './tols-random-name-generator/tols.random-name-generator.component';
import { TolsCharacterManager } from './tols-character-manager/tols.character-manager.component';
import { TolsStickyNotes } from './tols-sticky-notes/tols.sticky-notes.component';
import { TolsRecorder } from './tols-recorder/tols.recorder.component';
 
import { TolsRoutingModule } from './tols.routing.module';
const DECLARE_EXPORT = [ TolsDiceRoller , TolsInitiativeTracker, TolsRandomNameGenerator, 
  TolsCharacterManager, TolsStickyNotes, TolsRecorder];
@NgModule({
  imports:      [ BrowserModule, FormsModule, ArchModule, HttpModule, TolsRoutingModule  ],
  declarations: DECLARE_EXPORT,
  exports:      DECLARE_EXPORT,
})
export class TolsModule { }
