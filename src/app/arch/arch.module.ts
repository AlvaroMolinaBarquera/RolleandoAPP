import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { APP_INITIALIZER } from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

// Pipes
import { ArchOrderBy } from './pipes/arch.order-by.pipe';

// Componentes
import { ArchDiceRoller }  from './components/arch-dice-roller/arch.dice-roller.component';
import { ArchTable }  from './components/arch-table/arch.table.component';
import { ArchGameSelector }  from './components/arch-game-selector/arch.game-selector.component';
import { ArchGenericModal } from './components/arch-generic-modal/arch.generic-modal.component';

// Servicios
import { ArchDiceRollerService} from './services/arch.dice-roller.service';
import { ArchSystemDiceRollerService} from './services/arch.system-dice-roller.service';
import { ArchUsefulServices } from './services/arch.useful-services.service';
import { ArchRandomName } from './services/arch.random-name.service';
import { ArchGenericModalService } from './services/arch.generic-modal.service';
import { ArchTransactionService } from './services/arch.transaction.service';
import { ArchTracesService } from './services/arch.traces.service';
import { ArchActiveUserService } from './services/arch.active-user.service';
import { ArchConfigurationService } from './services/arch.configuration.service';

// Guards
import { ArchAuthGuard } from './guards/arch.auth.guard';

@NgModule({
  imports:      [ BrowserModule, FormsModule, NgbModule, HttpModule ],
  declarations: [ ArchDiceRoller, ArchOrderBy, ArchTable, ArchGameSelector, ArchGenericModal ],
  exports:      [ ArchDiceRoller, ArchOrderBy, ArchTable, ArchGameSelector, ArchGenericModal ],
  providers: [
    ArchConfigurationService,
    { provide: APP_INITIALIZER, useFactory: (config: ArchConfigurationService) => () => config.load(), deps: [ArchConfigurationService], multi: true },
    ArchDiceRollerService,
    ArchSystemDiceRollerService,
    ArchUsefulServices,
    ArchRandomName,
    ArchGenericModalService,
    ArchTransactionService,
    ArchTracesService,
    ArchActiveUserService,
    ArchAuthGuard
   ],
  entryComponents: [ArchGenericModal ]
})
export class ArchModule { }
