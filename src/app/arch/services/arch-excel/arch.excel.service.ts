import { Injectable } from '@angular/core';
import { ArchTracesService } from './../arch.traces.service';
import { Http, ResponseContentType } from '@angular/http';
import { ArchUtilsService} from './../arch.utils.service';

import 'rxjs/add/operator/toPromise';

/** 
 * Servicio encargado de pasar a Excel ( Y CSV ) Los datos
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

  /**
   * Exporta una transacción a un archivo plantilla excel.
   * Luego ofrece ese archivo como descarga a excel
   * @param trxData Los datos del cuerpo de la transacción.
   * @param fileName El nombre del archivo plantilla
   */
  exportTrxExcel = (trxData: any, fileName: string): void => {
    let jsonToNode = {} as ExcelData;
    jsonToNode.mode = EXCEL.TRANSACTION;
    jsonToNode.fileName = fileName;
    jsonToNode.data = trxData;
    this.httpCallAndHandleResponse(jsonToNode);
    }

    /**
     * Se encarga de hacer las llamadas HTTP al servicio de exportación a excel en el node
     * Luego ofrece como descarga los datos
     * @param jsonToNode Json con los datos a mandar al node.
     */
    httpCallAndHandleResponse(jsonToNode: ExcelData) {
        this.http.post('/api/excel', jsonToNode, {responseType: ResponseContentType.ArrayBuffer })
            .toPromise()
            .then((content: any) => {
                this.utilsService.offerDownload(jsonToNode.fileName, 'xlxs', content._body);
            })
    }
}
