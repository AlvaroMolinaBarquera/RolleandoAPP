import { Injectable, EventEmitter } from '@angular/core';
import { ArchTracesService } from './../arch.traces.service';
import * as _ from 'lodash';
@Injectable()
export class ArchEventsService {
  /** Objeto que contiene todos los eventos */
  obserbableObj: any;
  constructor (private tracesService: ArchTracesService) {
    this.obserbableObj = {};
  }

  /**
   * Devuelve un evento de la lista de eventos observables o lo crea y lo añade a la vista si no existiese
   * Las aplicaciones se pueden subscribir a este evento. 
   * @example Ejemplo de subscribirse
   * `
   *  this.eventsService.on('loremIpsum')
          .subscribe((args: any[]) => {
              // Manejar los args...
          })
   * `
   * @param name El nombre del evento en cuestión.
   * @return EventEmiter obserbable
   */
  on(name: string): EventEmitter<any> {
    if (!this.obserbableObj[name]) {
      this.obserbableObj[name] = new EventEmitter();
     }
    return this.obserbableObj[name];
  };

  /**
   * Emite un evento, que es recibido por cualquiera que este observandolo mediante
   * el metodo `on` de este misma clase
   * @param name Nombre del evento a emitir
   * @param args Argumentos que seran recibidos por el Observable
   */
  broadcast(name: string, ...args: any[]): void {
    if (this.obserbableObj[name]) {
      this.obserbableObj[name].emit(args);
    }
  }
}
