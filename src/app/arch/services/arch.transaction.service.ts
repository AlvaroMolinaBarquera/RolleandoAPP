import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { ArchTracesService } from './arch.traces.service';
import  { ArchConfigurationService }  from './arch.configuration.service';
import { ArchActiveUserService } from './arch.active-user.service';
import { ArchUtilsService } from './arch.utils.service';
interface Transaction {
  HEADER: TransactionHeader;
  BODY: any;
}

export interface TransactionHeader  {
    TRANSACTION: string;
    USER?: string;
    ID?: string;
  };

@Injectable()
export class ArchTransactionService {
  transactionServiceURL: string;
  constructor (
    private http: Http,
    private tracesService: ArchTracesService,
    private configurationService: ArchConfigurationService,
    private activeUserService: ArchActiveUserService,
    private archUtilsService: ArchUtilsService,
  ) {
    let node = this.configurationService.getProperty('node');

    this.transactionServiceURL = './api/transactions';
  }
   
  /**
   * Envia una transacción
   * @param header Cabecera de la transacción, el unico parametro obligatorio es el nombre de la transacción
   * @param body Objeto con el c uepro de la transacción.
   */
  sendTransaction = (header: TransactionHeader, body: any): Promise<any> => {
    this.tracesService.write.info('sendTransaction: Se inicia se transaction :', {'header': header, 'body': body});
    header = this.fillHeader(header);
    // Mezcla la cabecera y el cuerpo
    let transactionMessage = {HEADER: header, BODY: body}
    return this.http.post(this.transactionServiceURL, transactionMessage)
      .toPromise()
      .then((response: any) => {
        this.tracesService.write.info('sendTransaction: Respuesta de la transacción :', response._body);        
        try {
          return JSON.parse(response._body);
        } catch (e) {
          return response._body;
        }
      });
  }

  /**
   * Rellena la cabecera con los campos no informados
   * @param incompleteHeader Cabecera incompleta
   */
  fillHeader(incompleteHeader: TransactionHeader): TransactionHeader  {
    let header = {} as TransactionHeader;
    header = incompleteHeader;
    header.USER = this.activeUserService.getActiveUser() ? this.activeUserService.getActiveUser().name : '';
    header.ID = this.archUtilsService.uuidv4();
    return header;
  }
}
