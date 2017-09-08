import { Component, Output } from '@angular/core';
import {ChatSocketService, SocketMessageParams} from './../../services/chat.socket.service';
import { ArchDiceRollerService } from './../../../arch/services/arch.dice-roller.service';
import { ArchActiveUserService } from './../../../arch/services/arch.active-user.service';


@Component({
  selector: 'chat-message-input',
  templateUrl: './chat.message-input.view.html',
  styleUrls: ['./chat.message-input.styles.css'],
  
})

export class ChatMessageInput {
  private messageText: string; // Texto del mensaje
  private connection: any;
  private messageArray: any = []; // Array con todos los mensajes
  private activeUserName: string; // Nombre del usuario
  constructor(
    private chatService: ChatSocketService,
    private genericDiceRoller: ArchDiceRollerService,
    private activeUserService: ArchActiveUserService
  ) {
    this.activeUserName = this.activeUserService.getActiveUser()['name'];
  
  }
  
  validateKeyDown(event: KeyboardEvent) {
    if (event.code === 'Enter' && event.location === 0) {
      this.sendMessage();
    }
  };
  
  sendMessage() {
    // Expresión regular que controla si el mensaje es un susurro, es decir, si va dirigido a un jugador en especifico
    let whisperRegEx = /(w)\s(\w*)\s/ig;
    let whisperUser: string;
    if (whisperRegEx.test(this.messageText)) {
      let user = this.messageText.match(this.messageText)[0];
      // Quitamos la w y los espacios en blanco
      user.replace('/w', '').replace('\w', '');
      whisperUser = user;
    }

    // Envia el mensaje al servicio de socket
    this.chatService.sendMessage(this.messageText, {to: whisperUser});
    
    // Expresión Regular: Empieza por 'roll' luego al menos un digito, luego 'D', luego al menos un digito
    let rollRegEx = /(roll)\d+(d)\d+/ig;
    if (rollRegEx.test(this.messageText)) {
      let rolls = this.messageText.match(rollRegEx);
      for (let roll of rolls) {
        roll = roll.toLowerCase();
        let numberOfDices = Number(roll.substring(roll.lastIndexOf('l') + 1, roll.indexOf('d')));
        let faces = Number(roll.substring(roll.indexOf('d') + 1, roll.length));
        // Se envia un mensaje de texto al chat con el resultado de la tirada
        let rolls: number[] = this.genericDiceRoller.roll(numberOfDices, faces);
        let message: string = this.activeUserName + ' ha lanzado' + numberOfDices + 'D'+ faces + ' obteniendo: ' +  rolls.join(', ');
        this.chatService.sendMessage(message, {to: whisperUser})
      }
    }
    
    this.messageText = '';
  }

  ngOnInit() {
    this.connection = this.chatService.getMessages().subscribe(message => {
      this.messageArray.push(message);
    })
  }
  
  ngOnDestroy() {
    this.connection.unsubscribe();
  }
 }
