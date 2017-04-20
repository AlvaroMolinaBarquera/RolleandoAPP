import { Component, Input } from '@angular/core';
import { ArchRandomName } from './../../arch/services/arch.random-name.service'

import { BEHIND_THE_NAME_USAGES } from './tols.btn-usages';

@Component({
  selector: 'tols-random-name-generator',
  templateUrl: './tols.random-name-generator.view.html'
})
export class TolsRandomNameGenerator {
  usagesList: any[];
  usage: string;
  genderList: any[];
  gender: string;
  numNames: string;
  surname: boolean;
  suggestedNames: any[]
  constructor(private archRandomName: ArchRandomName) {
    this.numNames = '6';
    this.usagesList = BEHIND_THE_NAME_USAGES;
    this.genderList = [
      {code: 'm', name: 'masculinos'},
      {code: 'f', name: 'feminos'},
      {code: undefined, name: 'ambos'}

    ]
  }
  getRandomName() {
    this.suggestedNames = [];
    this.archRandomName.getBehindNameRandomName(this.gender, this.usage, this.surname, this.numNames)
      .then((response: any[]) => {
        for (let rN of response) {
          this.suggestedNames.push(rN)
        }
    })

  }
}
