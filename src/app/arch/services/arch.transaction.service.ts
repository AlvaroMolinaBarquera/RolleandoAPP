import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { ArchTracesService } from './arch.traces.service';

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
  constructor (
    private http: Http,
    private tracesService: ArchTracesService
  ) {
    this.transactionServiceURL = 'http://localhost:3333/api/login';
  }
   
  // Envia una transacción
  sendTransaction = (header: TransactionHeader, body: any): Promise<any> => {
    this.tracesService.write.info('Se inicia se transaction :', {'header': header, 'body': body});
    return this.http.post(this.transactionServiceURL, body)
      .toPromise()
      .then((response: any) => {
        return response._body;
      });
  }
}
