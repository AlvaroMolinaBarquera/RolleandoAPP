import { Component, Input } from '@angular/core';

@Component({
  selector: 'tols-dice-roller',
  templateUrl: './tols.dice-roller.view.html',
})
export class TolsDiceRoller {
  rollResults: any[] = [];
  handleDicesRolled(rollResult: string) {
    this.rollResults.unshift(rollResult);
  }
}
