import { Component, Output } from '@angular/core';
import {ChatSocketService} from './../../services/chat.socket.service';
import { ArchDiceRollerService } from './../../../arch/services/arch.dice-roller.service';


@Component({
  selector: 'chat-message-input',
  template: `
    <div *ngFor="let m of messageArray">
      {{m.text}}
    </div>
    <div class="input-group">
      <input type="text" class="form-control" placeholder="Escriba su mensaje aqui" [(ngModel)]="messageText">
      <span class="input-group-btn">
        <button class="btn btn-secondary" type="button" (click)="sendMessage()">Enviar</button>
      </span>
    </div> `,
})

export class ChatMessageInput {
  private messageText: string;
  private connection: any;
  private messageArray: any = [];
  constructor(
    private chatService: ChatSocketService,
    private genericDiceRoller: ArchDiceRollerService,
  ) {}
  
  sendMessage() {
    // Expresión Regular: Empieza por 'roll' luego al menos un digito, luego 'D', luego al menos un digito
    let rollRegEx = /(roll)\d+(d)\d+/ig;
    this.chatService.sendMessage(this.messageText);
    if (rollRegEx.test(this.messageText)) {
      let rolls = this.messageText.match(rollRegEx);
      for (let roll of rolls) {
        roll = roll.toLowerCase();
        let numberOfDices = Number(roll.substring(roll.lastIndexOf('l') + 1, roll.indexOf('d')));
        let faces = Number(roll.substring(roll.indexOf('d') + 1, roll.length));
        // Se envia un mensaje de texto al chat con el resultado de la tirada
        
        this.chatService.sendMessage(this.genericDiceRoller.roll(numberOfDices, faces, true))
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
