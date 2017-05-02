import { Component, Input } from '@angular/core';

@Component({
  selector: 'tols-character-manager',
  templateUrl: './tols.character-manager.view.html',
})
export class TolsCharacterManager {
  showNewGroup: boolean;
  characterGroups: any;
  characterName: string;
  groupName: string;
  groupSelected: string;
  chrTableData: any[];
  chrColumns: any[];
  constructor () {
      let charGroups = JSON.parse(localStorage.getItem('TOLS_CHARACTER_GROUPS'));
      if (!charGroups) {
        this.showNewGroup = true;
      } else {
        this.showNewGroup = false;
        this.characterGroups = charGroups;
      };
  }

  newGroup() {
    this.characterGroups = this.characterGroups || []
    this.characterGroups.push({groupName: this.groupName, columns: [], tableData: []});
    this.showNewGroup = false;
    localStorage.setItem('TOLS_CHARACTER_GROUPS', JSON.stringify(this.characterGroups));
  };

  addCharacter() {

    let columnTemplate = {key: '', text: ''};
    for (let grps in this.characterGroups) {
      if (this.groupSelected === this.characterGroups[grps].groupName) {
        if (this.characterGroups[grps].columns.length != 0) {
          let cl = this.characterGroups[grps].columns.length;
          this.characterGroups[grps].columns.push({key: 'character' + cl, text: this.characterName})
          this.chrColumns = this.characterGroups[grps].columns;

        } else {
          this.characterGroups[grps].columns.push({key: 'attrs', text: 'Atributos'});
          this.characterGroups[grps].columns.push({key: 'character1', text: this.characterName});
          this.chrColumns = this.characterGroups[grps].columns;
        }
        break;
      }
    }
    localStorage.setItem('TOLS_CHARACTER_GROUPS', JSON.stringify(this.characterGroups));
    this.characterName = '';
  };

  shNwGrp() {
    this.showNewGroup = true;
  }

  changeTable() {
    for (let grps in this.characterGroups) {
      if (this.groupSelected === this.characterGroups[grps].groupName) {
        this.chrColumns = this.characterGroups[grps].columns;
        this.chrTableData = this.characterGroups[grps].tableData;
      }
    }
  }




}
