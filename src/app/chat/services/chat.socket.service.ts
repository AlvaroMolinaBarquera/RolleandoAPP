import { Injectable } from '@angular/core';
import { ArchTracesService } from './../../arch/services/arch.traces.service';

let socketio = require('socketio')

@Injectable()
export class ChatSocketService {
  constructor (
    private tracesService: ArchTracesService
  ) {
    // Conectamos al servidor
    try {
           socketio();
      
    } catch (e ) {
      console.log(e) }
    try {
      io()
    } catch (e) {
      console.log('e2', e)
    }
  }
  
  public sendMessage = (message: any) => {
    console.log(message);
  }
}
