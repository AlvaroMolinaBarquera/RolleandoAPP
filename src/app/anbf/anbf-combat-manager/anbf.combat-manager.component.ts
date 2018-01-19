import { Component, Input } from '@angular/core';
import { tableConfiguration, tableColumns } from './../../arch/components/arch-table/arch.table.component';

import { ArchSystemDiceRollerService, animaConfiguration } from './../../arch/services/arch.system-dice-roller.service';
import { ArchUtilsService } from './../../arch/services/arch.utils.service';
import { GAME_SYSTEMS } from './../../arch/arch.constants';

@Component({
  selector: 'anbf-combat-manager',
  templateUrl: './anbf.combat-manager.view.html',
})
export class AnbfCombatManager {
  turnModBase: number;
  turnModAgility: number;
  turnModDextery: number;
  turnModWeapon: number;
  turnModArmor: number;
  turnModCategory: number;
  turnModOthers: number;
  turnTotal: number;

  botchRange: number;
  openRollRange: number;
  withoutOpenRoll: boolean;

  combatTableData: any[];
  combatTableConfig: tableConfiguration;
  combatTableColumns: Array<tableColumns>;

  characterName: string;
  oponent: boolean;
  constructor (
    private archSystemDiceRollerService: ArchSystemDiceRollerService,
    private archUtilsService: ArchUtilsService) {
    this.turnModBase = 20;
    this.turnModWeapon = 20;
    this.openRollRange = 90;
    this.botchRange = 3;
    this.calcTotalTurn();

    this.combatTableColumns = [
      {key: 'characterName', text: 'Nombre'},
      {key: 'initiative', text: 'Iniciativa'},
    ];
    this.combatTableConfig = {
      allowEdit: true,
      allowDelete: true,
    }
    this.combatTableData = [];
  }

  turnBaseChange(event: number) {
    this.turnModBase = event;
    this.calcTotalTurn()
  }
  turnAgilityChange(event: number) {
    this.turnModAgility = event;
    this.calcTotalTurn()
  }
  turnDexteryChange(event: number) {
    this.turnModDextery = event;
    this.calcTotalTurn()
  }
  turnWeaponChange(event: number) {
    this.turnModWeapon = event;
    this.calcTotalTurn()
  }
  turnArmorChange(event: number) {
    this.turnModArmor = event;
    this.calcTotalTurn()
  }
  turnCategoryChange(event: number) {
    this.turnModCategory = event;
    this.calcTotalTurn()
  }
  turnOthersChange(event: number) {
    this.turnModOthers = event;
    this.calcTotalTurn()
  }
  calcTotalTurn() {
    let tmb = this.turnModBase || 0;
    let tma = this.turnModAgility || 0;
    let tmd = this.turnModDextery || 0;
    let tmw = this.turnModWeapon || 0;
    let tmr = this.turnModArmor || 0;
    let tmc = this.turnModCategory || 0;
    let tmo = this.turnModOthers || 0;
    this.turnTotal = Number(tmb) + Number(tmw) + Number(tmr) + Number(tma) + Number(tmd) + Number(tmc) + Number(tmo);
  }

  addNewFigther() {
    this.combatTableData.push({
      characterName: this.characterName,
      isOponent: this.oponent || false,
      botchRange: this.botchRange,
      openRollRange: this.openRollRange,
      withoutOpenRoll: this.withoutOpenRoll,
      modifier: this.turnTotal,
      initiative: 0,
    });
    this.characterName = this.archUtilsService.updateNPCName(this.characterName);
  }
  newInitiatives() {
      let comTabDat = this.combatTableData;
      this.combatTableData = [];
      for (let ctd in comTabDat) {
        let configuration = {} as animaConfiguration
        configuration.botch = comTabDat[ctd].botchRange;
        configuration.isTurnRoll = true;
        configuration.openRollAllowed = !comTabDat[ctd].withoutOpenRoll;
        configuration.openRoll = comTabDat[ctd].openRollRange;
        let initiative = this.archSystemDiceRollerService.systemRoll(GAME_SYSTEMS.ANIMA_BEYOND_FANTASY, 1, 100, configuration)

        comTabDat[ctd].initiative = Number(initiative) +  Number(comTabDat[ctd].modifier);

        this.combatTableData.push(comTabDat[ctd]);
      }

  }

}
