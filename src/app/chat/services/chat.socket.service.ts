import { Injectable } from '@angular/core';
import { ArchTracesService } from './../../arch/services/arch.traces.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
let io = require('socketio');
import { ArchActiveUserService } from './../../arch/services/arch.active-user.service';

interface SocketMessage {
  text: string;
  user: string;
  color: string;
  params: SocketMessageParams
}

export interface SocketMessageParams {
  to: string | Array<string>; // Indica los usuarios a los cuales se les notifica un mensaje en concreto
}
 const COLORS = ['#EF9A9A', '#F48FB1', '#CE93D8', '#B39DDB', '#9FA8DA', '#90CAF9', '#81D4FA', '#80DEEA', '#80CBC4', '#A5D6A7'];

@Injectable()
export class ChatSocketService {
   private url = 'http://localhost:3333';  
   private socket: any;
  // Temporal
  private color: string = COLORS[Math.floor(Math.random() * 10)];
   constructor (
    private tracesService: ArchTracesService,
    private activeUserService: ArchActiveUserService
   ) {
   }

  sendMessage(message: string, params?: SocketMessageParams){
    let socketMessage = {} as SocketMessage;
    socketMessage.text = message;
    socketMessage.user = this.activeUserService.getActiveUser()['name'] || this.socket.id;
    socketMessage.color = this.color;
    socketMessage.params = params;
    this.socket.emit('add-message', socketMessage);    
  }
  
  getMessages() {
    let observable = new Observable(observer => {
      this.socket = io(this.url, {
        query: {
          name: this.activeUserService.getActiveUser()['name'],
          lastConnection: this.activeUserService.getActiveUser()['lastConnection']
        }
      });
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
