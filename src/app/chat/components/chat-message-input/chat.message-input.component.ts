import { Component, Output } from '@angular/core';
import {ChatSocketService} from './../../services/chat.socket.service';

@Component({
  selector: 'chat-message-input',
  template: `
    <div class="input-group">
      <input type="text" class="form-control" placeholder="Escriba su mensaje aqui" [(ngModel)]="messageText">
      <span class="input-group-btn">
        <button class="btn btn-secondary" type="button" (click)="sendMessage()">Enviar</button>
      </span>
    </div> `,
})

export class ChatMessageInput {
  private messageText: string;
  constructor(private chatService: ChatSocketService) {}
  sendMessage() {
    // Envia el mensaje al chatService
    this.chatService.sendMessage(this.messageText);
  };
 }
