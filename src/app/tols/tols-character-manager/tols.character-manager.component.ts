import { Component, Input } from '@angular/core';

@Component({
  selector: 'tols-character-manager',
  templateUrl: './tols.character-manager.view.html',
})
export class TolsCharacterManager {
  showNewGroup: boolean;
  characterGroups: any;
  groupName: string;
  groupSelected: string;
  constructor () {
      let charGroups = localStorage.getItem('TOLS_CHARACTER_GROUPS');
      if (!charGroups) {
        this.showNewGroup = true;
      } else {
        this.showNewGroup = false;
        this.characterGroups = charGroups;
      };
  }

  newGroup() {
    this.characterGroups = this.characterGroups || []
    this.characterGroups.push({groupName: this.groupName});
    this.showNewGroup = false;
  };

}
