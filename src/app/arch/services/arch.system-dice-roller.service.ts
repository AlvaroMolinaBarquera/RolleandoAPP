import { Injectable } from '@angular/core';

import { GAME_SYSTEMS } from './../arch.constants';
import { ArchDiceRollerService} from './arch.dice-roller.service';

export interface animaConfiguration {
  openRoll: number;
  openRollAllowed: boolean;
  botch: number;
  isTurnRoll: boolean;
}

interface worldOfDarknesConfiguration {
  difficulty: number;
  specialty: boolean;
  tensReroll: boolean;
}

@Injectable()
export class ArchSystemDiceRollerService {
  constructor(private archDiceRollerService: ArchDiceRollerService) {}

  systemRoll(system: GAME_SYSTEMS, numberOfDices: number, faces: number, config: any) {
    let roll = this.archDiceRollerService.roll(numberOfDices, faces);

    switch(system) {
      case GAME_SYSTEMS.ANIMA_BEYOND_FANTASY:
        return this.systemRollAnima(roll, config);
      case GAME_SYSTEMS.WORLD_OF_DARKNESS:
        return this.systemRollAnima(roll, config);
      default:
        return roll;
    }
  }
  /*
  *
  */
  systemRollAnima(roll: any[number], config: animaConfiguration, rollResult?: number, secondRoll?: boolean): number {
    if (roll.length > 1) {
      return;
    }
    let rollResultReturned;
    if (roll[0] >= config.openRoll  && config.openRollAllowed) {
      let newRoll = this.archDiceRollerService.roll(1, 100);
      config.openRoll = Number(config.openRoll) + 1;
      if (rollResult) {
        rollResult += roll[0];
      } else {
        rollResult = roll[0];
      }
      return this.systemRollAnima(newRoll, config, rollResult, true);
    } else if (roll[0] <= config.botch && !secondRoll) {
      if (!config.isTurnRoll) {
        let newRoll: any[number] = this.archDiceRollerService.roll(1, 100);
        rollResultReturned = roll[0] - newRoll[0];
      } else {
        switch (roll[0]) {
          case 1:
            rollResultReturned = roll[0] - 125;
            break;
          case 2:
            rollResultReturned = roll[0] - 100;
            break;
          case 3:
            rollResultReturned = roll[0] - 75;
            break;
          default:
            let newRoll: any[number] = this.archDiceRollerService.roll(1, 100);
            rollResultReturned = roll[0] - newRoll[0];
        }
      }
      return rollResultReturned;
    } else {
      if (rollResult) { rollResultReturned = rollResult } else { rollResultReturned = roll[0]};
      return rollResultReturned;
    }

  }

  systemRollWOD(roll: any[number], config: worldOfDarknesConfiguration) {
    let sucesses: number = 0;

    for (let r of roll) {
      if (r >= config.difficulty) {
        if (r === 10 && config.specialty) {
          sucesses += 2;
        } else {
          sucesses += 1;
        }
      } else if (r === 1) {
        sucesses += -1;
      }
    }
  }

  }
