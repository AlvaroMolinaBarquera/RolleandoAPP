import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { ArchOrderBy } from './pipes/arch.order-by.pipe';
import { ArchDiceRoller }  from './components/arch-dice-roller/arch.dice-roller.component';
import { ArchTable }  from './components/arch-table/arch.table.component';
import { ArchDiceRollerService} from './services/arch.dice-roller.service'
import { ArchSystemDiceRollerService} from './services/arch.system-dice-roller.service'
import { ArchUsefulServices } from './services/arch.useful-services.service'

@NgModule({
  imports:      [ BrowserModule, FormsModule, NgbModule ],
  declarations: [ ArchDiceRoller, ArchOrderBy, ArchTable ],
  exports:      [ ArchDiceRoller, ArchOrderBy, ArchTable ],
  providers: [ArchDiceRollerService, ArchSystemDiceRollerService, ArchUsefulServices ],
})
export class ArchModule { }
