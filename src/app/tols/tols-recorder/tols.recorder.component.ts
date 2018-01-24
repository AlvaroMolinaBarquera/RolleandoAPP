import { Component, Input } from '@angular/core';
import { ArchGenericModalService } from './../../arch/services/arch.generic-modal.service'
import { ArchTracesService } from './../../arch/services/arch.traces.service';
import { MODAL_TYPE } from './../../arch/arch.constants';

import { ArchErrorsService } from './../../arch/services/arch-errors/arch.errors.service';

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
  constructor(
    private tracesService: ArchTracesService,
    private errorsService: ArchErrorsService,
    private genericModalService: ArchGenericModalService
  ) {
    this.isRecording = false;
    this.showRecorder = this.hasGetUserMedia();
  }
  
  /**
   * Comprueba que el navegador permite la grabación
   */
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
    // Se trata de acceder al microfono
    navigator.getUserMedia({audio: true}, 
      (audioStream: MediaStream) => {
        // Se expone el audio stream de forma publica para que se pueda detener
        this.audioStream = audioStream;
        window.URL.createObjectURL(audioStream);
     },
     (error: MediaStreamError) => {
        // Si se produce un error muestra un error
        this.genericModalService.openModal(
          MODAL_TYPE.ERROR, 
          'ERROR', 
          this.errorsService.getErrorDescription(error.name)
        );
        this.tracesService.writeError('Error en el mediaStream', error);                
        // Se para la grabación
        this.stopRecord();
     })
  };

  /** 
   * Para la grabación 
   */
  stopRecord() {
    this.tracesService.writeDebug('Se finaliza la grabación la grabación');
    this.isRecording = false;
    try { this.audioStream.stop() } catch (error) { }
  };
}
