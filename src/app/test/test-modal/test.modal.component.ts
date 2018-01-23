import { Component } from '@angular/core';

import { ArchGenericModalService } from './../../arch/services/arch.generic-modal.service';
@Component({
  selector: 'test-modal',
  templateUrl: './test.modal.view.html',
})
export class TestModal  {
  modalTitle: string;
  modalBody: string;
  modalType: number;

  constructor (private modalService: ArchGenericModalService)  {
    this.modalType = 0;
    this.modalBody = 'Cuerpo de Modal';
    this.modalTitle = 'Titulo de Modal'
  }

  createModal() {
    let type = Number(this.modalType);
    this.modalService.openModal(type, this.modalTitle, this.modalBody)
      .then((response: any) => {
        alert(response);
      })
  }
}
