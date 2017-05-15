import { Component } from '@angular/core';

import { ArchGenericModalService } from './../../arch/services/arch.generic-modal.service';
@Component({
  selector: 'test-modal',
  templateUrl: './test.modal.view.html',
})
export class TestModal  {
  modalTitle: string;
  modalBody: string;
  constructor (private modalService: ArchGenericModalService)  {
    this.modalBody = 'Cuerpo de Modal';
    this.modalTitle = 'Titulo de Modal'
  }

  createModal() {
    this.modalService.openModal(this.modalTitle, this.modalBody)
      .then((response: any) => {
        alert(response);
      })
  }
}
