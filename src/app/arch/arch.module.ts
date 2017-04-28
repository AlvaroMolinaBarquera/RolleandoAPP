import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { ArchOrderBy } from './pipes/arch.order-by.pipe';
import { ArchDiceRoller }  from './components/arch-dice-roller/arch.dice-roller.component';
import { ArchTable }  from './components/arch-table/arch.table.component';
import { ArchGameSelector }  from './components/arch-game-selector/arch.game-selector.component';
import { ArchGenericModal } from './components/arch-generic-modal/arch.generic-modal.component';

import { ArchDiceRollerService} from './services/arch.dice-roller.service'
import { ArchSystemDiceRollerService} from './services/arch.system-dice-roller.service'
import { ArchUsefulServices } from './services/arch.useful-services.service'
import { ArchRandomName } from './services/arch.random-name.service'
import { ArchGenericModalService } from './services/arch.generic-modal.service'

@NgModule({
  imports:      [ BrowserModule, FormsModule, NgbModule, HttpModule ],
  declarations: [ ArchDiceRoller, ArchOrderBy, ArchTable, ArchGameSelector, ArchGenericModal ],
  exports:      [ ArchDiceRoller, ArchOrderBy, ArchTable, ArchGameSelector, ArchGenericModal ],
  providers: [ArchDiceRollerService, ArchSystemDiceRollerService, ArchUsefulServices, ArchRandomName, ArchGenericModalService ],
  entryComponents: [ArchGenericModal ]
})
export class ArchModule { }
