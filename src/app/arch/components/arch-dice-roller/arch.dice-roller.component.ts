import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ArchDiceRollerService } from './../../services/arch.dice-roller.service';

@Component({
  selector: 'arch-dice-roller',
  templateUrl: './arch.dice-roller.view.html',
})
export class ArchDiceRoller implements OnInit {
  @Input() faces: number;
  @Input() numberOfDices: number;
  @Input() toString: boolean;
  @Output() dicesRolled = new EventEmitter();

  showFacesInput: boolean;
  constructor(private archDiceRollerService: ArchDiceRollerService) {

    this.numberOfDices = this.numberOfDices || 1;
  }
  ngOnInit(){
    if (!this.faces) {
      this.showFacesInput = true;
    } else {
      this.showFacesInput = false;
    }
    this.toString = true || false;
  }

  rollDices() {
    console.log('Se van a lanzar ' + this.numberOfDices + 'D' + this.faces);
    let result = this.archDiceRollerService.roll(this.numberOfDices, this.faces, this.toString);
    this.dicesRolled.emit(result);
  }
}
