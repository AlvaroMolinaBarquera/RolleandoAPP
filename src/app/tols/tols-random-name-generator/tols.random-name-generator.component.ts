import { Component, Input } from '@angular/core';
import { ArchRandomName } from './../../arch/services/arch.random-name.service'

import { BEHIND_THE_NAME_USAGES } from './tols.btn-usages';

@Component({
  selector: 'tols-random-name-generator',
  template: `<button class="btn btn-success" (click)="getRandomName()"> Generar </button>
  <select>
    <optgroup label="usages">
      <option *ngFor="let usage of usages">{{usage.FULL}}</option>
    </optgroup>
  </select>
  `,
})
export class TolsRandomNameGenerator {
  usages: any[];
  constructor(private archRandomName: ArchRandomName) {
    this.usages = BEHIND_THE_NAME_USAGES;
  }
  getRandomName() {
    let randomName = this.archRandomName.getBehindNameRandomName();
    console.log(randomName);
  }
}
