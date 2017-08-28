import { Component } from '@angular/core';

import { ArchTransactionService, TransactionHeader } from './../../arch/services/arch.transaction.service';
@Component({
  selector: 'test-transactions',
  templateUrl: './test.transactions.view.html',
})
export class TestTransactions  {
  modalTitle: string;
  modalBody: string;
  constructor (private transactionService: ArchTransactionService)  {
  }

  sendTransaction() {
    let header = {}  as TransactionHeader;
    header.Transaction = '';
    header.User = '';
    this.transactionService.sendTransaction(header, '')
      .then((response: any) => {
        alert(response);
      });
  }
}
