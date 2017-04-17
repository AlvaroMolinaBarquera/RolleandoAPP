import { Component, Input } from '@angular/core';
import { ArchDiceRollerService } from './../../arch/services/arch.dice-roller.service';
import { ArchSystemDiceRollerService } from './../../arch/services/arch.system-dice-roller.service';
import { tableConfiguration, tableColumns } from './../../arch/components/arch-table/arch.table.component';

@Component({
  selector: 'tols-initiative-tracker',
  templateUrl: './tols.initiative-tracker.view.html',
})
export class TolsInitiativeTracker {
  characterName: string;
  faces: number;
  numberOfDices: number;
  modifier: number;
  iniativesOrder: any[];
  playerCharacter: boolean;
  initiativeTableData: any[];
  initiativeTableColumns: Array<tableColumns>;
  initiativeTableConfig: tableConfiguration;
  constructor(private archDiceRollerService: ArchDiceRollerService, private archSystemDiceRollerService: ArchSystemDiceRollerService) {
    this.modifier = 0;
    this.numberOfDices = 1;
    this.initiativeTableData = [];
    this.initiativeTableConfig = {
      allowDelete: true,
      allowEdit: true
    }
    this.initiativeTableColumns = [
      {key: 'playerCharacter', text: 'Per. Jugador'},
      {key: 'characterName', text: 'Nom. Personaje'},
      {key: 'numberOfDices', text: 'Num. Dados'},
      {key: 'faces', text: 'Caras'},
      {key: 'modifier', text: 'Modificador'},
      {key: 'initiative', text: 'Iniciativa'},

    ]
  }
  addCharacter() {
      this.initiativeTableData.push({
        characterName: this.characterName,
        numberOfDices: this.numberOfDices,
        faces: this.faces,
        modifier: this.modifier,
        initiative: 0,
        playerCharacter: this.playerCharacter || false,
      });
      if (this.characterName.indexOf('#') != -1) {
        let n: any = this.characterName.substring(this.characterName.indexOf('#') + 1, this.characterName.length);
        n = Number(n);
        n++;
        this.characterName = this.characterName.substring(0, this.characterName.indexOf('#') + 1) + n;
      }
  }

  newInitiatives() {
      let iniativesOrder = this.initiativeTableData;
      this.initiativeTableData = [];
      for (let ini in iniativesOrder) {

        let initiative = this.archDiceRollerService.roll(iniativesOrder[ini].numberOfDices, iniativesOrder[ini].faces);
        let initi = 0;
        for (let i of initiative) {
          initi += Number(i);
        }
        iniativesOrder[ini].initiative = initi +  Number(iniativesOrder[ini].modifier);

        this.initiativeTableData.push(iniativesOrder[ini]);
      }

  }

  deleteNonPlayerCharacters() {
    let itdl = this.initiativeTableData.length - 1;
    for (let itd = itdl; itd >= 0; itd--) {
      if (!this.initiativeTableData[itd].playerCharacter) {
        this.initiativeTableData.splice(Number(itd), 1);
      }
    }
  }

  test() {
      let animaConfiguration = {
      openRoll: 95,
      openRollAllowed: true,
      botch: 80
    }
    this.archSystemDiceRollerService.systemRoll(0, 1, 100, animaConfiguration);
  }
}
