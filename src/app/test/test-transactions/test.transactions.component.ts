import { Component } from '@angular/core';

import { ArchTransactionService, TransactionHeader } from './../../arch/services/arch.transaction.service';
@Component({
  selector: 'test-transactions',
  templateUrl: './test.transactions.view.html',
})
export class TestTransactions  {
  trxName: string;
  trxUser: string;
  trxBody: any;
  trxResponse: any;
  validJson: boolean = true;
  constructor (private transactionService: ArchTransactionService)  {
  }

  sendTransaction() {
    let header = {}  as TransactionHeader;
    header.TRANSACTION = this.trxName;
    header.USER = this.trxUser;
    this.validJson = true;
    let body = null;
    try { 
      body = JSON.parse(this.trxBody)
    } catch (error) { 
        this.validJson = false
        return;
    }
    this.transactionService.sendTransaction(header, body)
      .then((response: any) => {
        this.trxResponse = JSON.stringify(response);
      });
  }
}
