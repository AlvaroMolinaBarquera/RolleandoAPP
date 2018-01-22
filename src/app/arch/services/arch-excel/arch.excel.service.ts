import { Injectable } from '@angular/core';
import { ArchTracesService } from './../arch.traces.service';
import { Http, ResponseContentType } from '@angular/http';
import { ArchUtilsService} from './../arch.utils.service';

import 'rxjs/add/operator/toPromise';

/** 
 * Servicio encargado de pasar a Excel ( Y CSV ) Los Datos
 * 
 */
enum EXCEL {
    TRANSACTION,
}
interface ExcelData {
    mode: EXCEL,
    fileName: string;
    data: any;
}

@Injectable()
export class ArchExcelService {
  constructor (
      private http: Http,
      private tracesService: ArchTracesService,
      private utilsService: ArchUtilsService
    ) {}

  exportTrxExcel = (trxData: any, fileName: string): void => {
    let jsonToNode = {} as ExcelData;
    jsonToNode.mode = EXCEL.TRANSACTION;
    jsonToNode.fileName = fileName;
    jsonToNode.data = trxData;
    this.httpCallAndHandleResponse(jsonToNode, fileName);
    }

    httpCallAndHandleResponse(jsonToNode: ExcelData, fileName: string) {
        this.http.post('/api/excel', jsonToNode, {responseType: ResponseContentType.ArrayBuffer })
            .toPromise()
            .then((content: any) => {
                this.utilsService.offerDownload(fileName + '.xlxs', 'xlxs', content._body);
            })
    }
}
