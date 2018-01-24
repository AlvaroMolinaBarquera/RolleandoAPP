import { Component, Input } from '@angular/core';
import { ArchGenericModalService } from './../../arch/services/arch.generic-modal.service'
import { ArchTracesService } from './../../arch/services/arch.traces.service';

@Component({
  selector: 'tols-recorder',
  template: `
  <button *ngIf="showRecorder" class="btn btn-danger" (click)="record()" id="tols-audio-recorder">
    <span *ngIf="!isRecording"> <i class="fa fa-microphone" aria-hidden="true"></i>
   </span><span *ngIf="isRecording"> <i class="fa fa-microphone-slash" aria-hidden="true"></i>
   </span>
  </button> 
  <span *ngIf="isRecording">Grabando...</span>`
})
export class TolsRecorder {
  isRecording: boolean;
  showRecorder: boolean;
  audioStream: MediaStream;
  constructor(private tracesService: ArchTracesService) {
    this.isRecording = false;
    this.showRecorder = this.hasGetUserMedia();


  }

  hasGetUserMedia() {
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
              navigator.mozGetUserMedia || navigator.msGetUserMedia);
  }

  record() {
    if (this.isRecording) {
      this.stopRecord();
    } else {
      this.startRecord();
    }
    this.isRecording = !this.isRecording;
  }

  /**
   * Comienza a grabar
   */
  startRecord() {
    this.tracesService.writeDebug('Se inicia la grabación');
    navigator.getUserMedia({audio: true}, 
      (audioStream: MediaStream) => {
        this.audioStream = audioStream;
        window.URL.createObjectURL(audioStream);
     },
     (error: MediaStreamError) => {
        this.tracesService.writeError('Error en el mediaStream', error);
        /** @TODO Modal Error */
        this.stopRecord();
     })
  };

  stopRecord() {
    this.tracesService.writeDebug('Se finaliza la grabación la grabación')
    try { this.audioStream.stop() } catch (error) { }
  };
}
