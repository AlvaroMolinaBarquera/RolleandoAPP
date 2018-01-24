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
  suggestedNamesTableData: any[]
  suggestedNamesTableColumns: any[];
  suggestedNamesRowActions: any
  constructor(private archRandomName: ArchRandomName) {
    this.numNames = '6';
    this.usagesList = BEHIND_THE_NAME_USAGES;
    this.genderList = [
      {code: 'm', name: 'masculinos'},
      {code: 'f', name: 'feminos'},
      {code: undefined, name: 'ambos'}
    ];
    this.suggestedNamesTableColumns = [
      {key: 'name', text: 'Nombre'}
    ]
    this.suggestedNamesRowActions = {rowActions: [{text: 'Detalle', action: this.goToName }]};
  }
  getRandomName() {
    this.suggestedNamesTableData = [];
    this.archRandomName.getBehindNameRandomName(this.gender, this.usage, this.surname, this.numNames)
      .then((response: any[]) => {
        for (let rN of response) {
          this.suggestedNamesTableData.push({name: rN})
        }
    })
  }
  goToName(row: {name: string}): void {
    if (row.name) {
      window.open('https://www.behindthename.com/name/' + row.name.toLowerCase(), '_blank')
    }
  }
}
