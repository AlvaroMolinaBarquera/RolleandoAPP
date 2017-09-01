import { Injectable } from '@angular/core';
import { ArchTracesService } from './../../arch/services/arch.traces.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
let io = require('socketio');

interface SocketMessage {
  text: string;
  user: string;
}

@Injectable()
export class ChatSocketService {
   private url = 'http://localhost:3333';  
   private socket: any;
   constructor (
    private tracesService: ArchTracesService
   ) {
   }

  sendMessage(message: any){
    let socketMessage = {} as SocketMessage;
    socketMessage.text = message;
    socketMessage.user = this.socket.id;
    this.socket.emit('add-message', socketMessage);    
  }
  
  getMessages() {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('message', (data: any) => {
        observer.next(data);    
      });
      return () => {
        this.socket.disconnect();
      };  
    })     
    return observable;
  }  
}
