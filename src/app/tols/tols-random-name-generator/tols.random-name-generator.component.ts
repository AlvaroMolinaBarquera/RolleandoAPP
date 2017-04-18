import { Component, Input } from '@angular/core';
import { ArchRandomName } from './../../arch/services/arch.random-name.service'


@Component({
  selector: 'tols-random-name-generator',
  template: `<button class="btn btn-success" (click)="getRandomName()"> Generar </button>`,
})
export class TolsRandomNameGenerator {
  constructor(private archRandomName: ArchRandomName) {}
  getRandomName() {
    let randomName = this.archRandomName.getBehindNameRandomName();
    console.log(randomName);
  }
}
