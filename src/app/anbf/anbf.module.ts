import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { ArchModule } from './../arch/arch.module';
import { AnbfCombatManager } from './anbf-combat-manager/anbf.combat-manager.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, ArchModule ],
  declarations: [ AnbfCombatManager ],
  exports:      [ AnbfCombatManager ],
})
export class AnbfModule { }
