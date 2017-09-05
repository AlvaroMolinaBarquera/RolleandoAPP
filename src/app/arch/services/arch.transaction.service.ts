import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { ArchTracesService } from './arch.traces.service';

interface Transaction {
  HEADER: TransactionHeader;
  BODY: any;
}

export interface TransactionHeader  {
    TRANSACTION: string;
    USER: string;
  };

@Injectable()
export class ArchTransactionService {
  transactionServiceURL: string;
  constructor (
    private http: Http,
    private tracesService: ArchTracesService
  ) {
    this.transactionServiceURL = 'http://localhost:3333/api/transactions';
  }
   
  // Envia una transacción
  sendTransaction = (header: TransactionHeader, body: any): Promise<any> => {
    this.tracesService.write.info('Se inicia se transaction :', {'header': header, 'body': body});
    // Mezcla la cabecera y el cuerpo
    let transactionMessage = {HEADER: header, BODY: body}
    return this.http.post(this.transactionServiceURL, transactionMessage)
      .toPromise()
      .then((response: any) => {
        return response._body;
      });
  }
}
