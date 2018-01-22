import { Component } from '@angular/core';

import { ArchExcelService } from './../../arch/services/arch-excel/arch.excel.service';
@Component({
  selector: 'test-excel',
  templateUrl: './test.excel.view.html',
})
export class TestExcel  {
    validJson: boolean = true;
  constructor (private excelService: ArchExcelService)  {
  }

  toExcel(trxData: any, fileName: string): void {
    this.validJson = true;
    let data = null;
    try { 
        data = JSON.parse(trxData)
    } catch (error) { 
        this.validJson = false
        return;
    }
    this.excelService.exportTrxExcel(data, fileName);
  }
}
