import { Injectable } from '@angular/core';

import {ArchGenericModal } from './../components/arch-generic-modal/arch.generic-modal.component';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class ArchGenericModalService {
  constructor(private modalService: NgbModal) {};

  openModal(title: string, body: string) {

    const modalRef = this.modalService.open(ArchGenericModal);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.body = body;

    modalRef.result
    .then((result)=> {
      console.log(result)
    })
    .catch((reason) => {
      console.log(reason)
    });
  }

}
