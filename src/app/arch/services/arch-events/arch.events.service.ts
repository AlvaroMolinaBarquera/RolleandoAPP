import { Injectable, EventEmitter } from '@angular/core';
import { ArchTracesService } from './../arch.traces.service';
import * as _ from 'lodash';
@Injectable()
export class ArchEventsService {
  /** LISTA DE EVENTOS */
  obserbableObj: any;
  constructor (private tracesService: ArchTracesService) {
    this.obserbableObj = {};
  }

  on(name: string): EventEmitter<any> {
    if (!this.obserbableObj[name]) {
      this.obserbableObj[name] = new EventEmitter();
     }
    return this.obserbableObj[name];
  };

  broadcast(name: string, ...args: any[]): void {
    if (this.obserbableObj[name]) {
      this.obserbableObj[name].emit(args);
    }
  }
}
