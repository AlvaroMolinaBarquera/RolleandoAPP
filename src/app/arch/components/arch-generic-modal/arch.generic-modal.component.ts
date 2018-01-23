import { Component, Input, Output,  EventEmitter } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { MODAL_BUTTON, MODAL_TYPE } from './../../arch.constants';

@Component({
  selector: 'arch-generic-modal',
  templateUrl: './arch.generic-modal.view.html',
})
export class ArchGenericModal {
  body: string;
  title: string;
  type: MODAL_TYPE;
  buttonArray: MODAL_BUTTON[];
  MODAL_BUTTON: any;
  constructor(public activeModal: NgbActiveModal) {
    // Igualamos la constante para poder usarla en la vista
    this.MODAL_BUTTON = MODAL_BUTTON;
    switch (this.type) {
      case MODAL_TYPE.QUESTION:
        this.buttonArray = [MODAL_BUTTON.YES, MODAL_BUTTON.NO ];
      break;
      case MODAL_TYPE.ERROR:
      case MODAL_TYPE.INFO:
      case MODAL_TYPE.WARNING:
        this.buttonArray = [MODAL_BUTTON.ACCEPT];
      break;
      default:
        this.buttonArray = [MODAL_BUTTON.CLOSE];
      break;
    }
  }
}
