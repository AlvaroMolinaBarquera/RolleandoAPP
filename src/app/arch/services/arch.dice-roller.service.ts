import { Injectable } from '@angular/core';
import { ArchTracesService } from './arch.traces.service';

@Injectable()
export class ArchDiceRollerService {
  constructor (private tracesService: ArchTracesService) {}

  roll(numberOfDices: number, faces: number, toString?: boolean) {
    let rollResult = [];
    for (let n = 0; n < numberOfDices; n++) {
      rollResult.push(Math.floor(Math.random() * faces) + 1);
    };
    this.tracesService.write.info('Se han lanzado ' + numberOfDices + 'D' + faces + ' y se ha obtenido: ', rollResult.join(', '));
    if (toString) {
      return this.transformRollResultToString(rollResult, numberOfDices, faces);
    } else {
      return rollResult;
    }
  };

  transformRollResultToString(rollResult: any[], numberOfDices: number, faces: number) {
    let resturnedString: string = 'Se han lanzado ' + numberOfDices + 'D' + faces + ' y se ha obtenido: ';
    let rollResultJoined = rollResult.join(', ');
    resturnedString += rollResultJoined;
    return resturnedString;
  }
}
