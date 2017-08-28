import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';


interface Transaction {
  Header: TransactionHeader;
  Body: any;
}

export interface TransactionHeader  {
    Transaction: string;
    User: string;
  };

@Injectable()
export class ArchTransactionService {
  transactionServiceURL: string;
  constructor (private http: Http) {
    this.transactionServiceURL = 'localhost:3333/login';
  }
   
   // Envia una transacción
  sendTransaction = (Header: TransactionHeader, Body: any): Promise<any> => {
    return this.http.post(this.transactionServiceURL, Body)
      .toPromise()
      .then((response: any) => {
        return response;
      });
  }
}
