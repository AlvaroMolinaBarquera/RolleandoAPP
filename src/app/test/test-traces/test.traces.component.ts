import { Component } from '@angular/core';
import { ArchTracesService, TRACES_LEVEL } from './../../arch/services/arch.traces.service';
@Component({
  selector: 'test-traces',
  templateUrl: './test.traces.view.html',
})
export class TestTraces  {
  traceLevel: TRACES_LEVEL;
  message: string;
  paramsObj: any;
  paramsString: string;

  constructor (private tracesService: ArchTracesService)  {  }
  capitalize = (str: string): string => {
    let first = str[0].toUpperCase();
    let rest = str.substring(1);
    return first + rest;
  }

  /**
   * Escribe una traza del tipo que se le pase
   */
  writeTrace() {
    let params = null;
    try {params = JSON.parse(this.paramsObj)} catch (e) {params = this.paramsString || null}
    let level: string = this.tracesService.getLevel(Number(this.traceLevel));
    let fn = 'write' + this.capitalize(level);
    this.tracesService[fn](this.message, params)
  }
}
