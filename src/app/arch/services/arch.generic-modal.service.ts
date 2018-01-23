import { Injectable } from '@angular/core';

import {ArchGenericModal } from './../components/arch-generic-modal/arch.generic-modal.component';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { MODAL_TYPE } from './../arch.constants';

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
    return modalRef.result
    .then((result) => {
      return result;
    })
    .catch((reason) => {
      console.log(reason);
    });
  }

}
