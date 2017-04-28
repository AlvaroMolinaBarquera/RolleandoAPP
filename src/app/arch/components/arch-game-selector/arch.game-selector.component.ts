import { Component, Output, EventEmitter} from '@angular/core';
import { ArchDiceRollerService } from './../../services/arch.dice-roller.service';

import { LIST_OF_GAMES } from './../../arch.constants';

@Component({
  selector: 'arch-game-selector',
  template: `
  <select class="form-control" [(ngModel)]="gameSelected">
    <option *ngFor="let game of listOfGames" value="{{game.CODE}}">{{game.FULL}}</option>
  </select>
`
})

export class ArchGameSelector {
  @Output() gameSelected = new EventEmitter();
  listOfGames: any[];
  constructor() {
    this.listOfGames = LIST_OF_GAMES;
  }
}
