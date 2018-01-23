import { Injectable } from '@angular/core';
import {ArchGenericModal } from './../components/arch-generic-modal/arch.generic-modal.component';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { MODAL_TYPE, MODAL_BUTTON } from './../arch.constants';

@Injectable()
export class ArchGenericModalService {
  constructor(private modalService: NgbModal) {};
  /** 
  * Crea una modal y luego devuelve el resultado.
  * @param type El tipo de la modal, se importa desde constantes.
  * @param title El titulo de la modal.
  * @param body El cuerpo de la modal.
  *
   */
  openModal(type: MODAL_TYPE, title: string, body: string) {
    const modalRef = this.modalService.open(ArchGenericModal);
    
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.body = body;
    modalRef.componentInstance.type = type;
    modalRef.componentInstance.buttonArray = this.generateButtonArray(type);
    
    return modalRef.result
    .then((result) => {
      return result;
    })
    .catch((reason) => {
      console.log(reason);
    });
  }
  /**
   * Para una nodal en concreto genera su ARRAY de botones.
   * @param type El tipo de la modal
   * @return El array de botones que va a tener dicha modal.
   */
  generateButtonArray(type: MODAL_TYPE){
    let buttonArray;
    switch (type) {
      case MODAL_TYPE.QUESTION:
        buttonArray = [MODAL_BUTTON.YES, MODAL_BUTTON.NO];
      break;
      case MODAL_TYPE.ERROR:
      case MODAL_TYPE.INFO:
      case MODAL_TYPE.WARNING:
        buttonArray = [MODAL_BUTTON.ACCEPT];
      break;
      default:
        buttonArray = [MODAL_BUTTON.CLOSE];
      break;
    }
    return buttonArray;
  }
}
