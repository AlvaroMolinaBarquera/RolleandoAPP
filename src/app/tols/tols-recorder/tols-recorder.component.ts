import { Component, Input } from '@angular/core';
import { ArchGenericModalService } from './../../arch/services/arch.generic-modal.service'


@Component({
  selector: 'tols-recorder',
  template: `<button class="btn btn-danger" (click)="record()" *ngIf="hideRecorder" id="tols-audio-recorder">Grabar</button> <span *ngIf="isRecording">Grabando...</span>`
})
export class TolsRecorder {
  isRecording: boolean;
  hideRecorder: boolean;
  constructor() {
    this.isRecording = false;
  }

  record() {
    if (this.isRecording) {
      this.isRecording = false;
      this.stopRecord();
    } else {
      this.startRecord();
    }
  }

  startRecord() {

  };

  stopRecord() {

  };
}
