import { Injectable } from '@angular/core';
import { ArchTracesService } from './../../arch/services/arch.traces.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
let io = require('socketio');
import { ArchActiveUserService } from './../../arch/services/arch.active-user.service';


@Injectable()
export class ChatSocketService {
   private url = 'http://localhost:3333';  
   private socket: any;
  // Temporal
   constructor (
    private tracesService: ArchTracesService,
    private activeUserService: ArchActiveUserService
   ) {
   }

  sendMessage(message: any){
    this.socket.emit('add-message', message);    
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
