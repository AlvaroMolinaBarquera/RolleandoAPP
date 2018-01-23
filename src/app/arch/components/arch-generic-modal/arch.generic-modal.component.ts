import { Component, Input, Output,  EventEmitter } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { MODAL_BUTTON, MODAL_TYPE } from './../../arch.constants';
import 'rxjs/Observable';

@Component({
  selector: 'arch-generic-modal',
  templateUrl: './arch.generic-modal.view.html',
})
export class ArchGenericModal {
  body: string;
  title: string;
  type: MODAL_TYPE;
  buttonArray: MODAL_BUTTON[];
  MODAL_BUTTON: any = MODAL_BUTTON;
  MODAL_TYPE: any = MODAL_TYPE;
  
  constructor(public activeModal: NgbActiveModal) {
      case MODAL_TYPE.WARNING:
    
  }
}
