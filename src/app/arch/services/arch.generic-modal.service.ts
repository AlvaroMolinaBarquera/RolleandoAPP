import { Injectable } from '@angular/core';

import {ArchGenericModal } from './../components/arch-generic-modal/arch.generic-modal.component';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class ArchGenericModalService {
  constructor(private modalService: NgbModal) {};
  /* Crea una modal y luego devuelve el resultado.
  * @param {string} title: El titulo de la modal.
  * @param {string} body: El cuerpo de la modal.
  *
   */
  openModal(title: string, body: string) {

    const modalRef = this.modalService.open(ArchGenericModal);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.body = body;

    return modalRef.result
    .then((result)=> {
      return result;
    })
    .catch((reason) => {
      console.log(reason)
    });
  }

}
