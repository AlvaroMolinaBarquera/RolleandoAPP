import { Component, Output } from '@angular/core';
import {ChatSocketService} from './../../services/chat.socket.service';
import { ArchDiceRollerService } from './../../../arch/services/arch.dice-roller.service';
import { ArchActiveUserService } from './../../../arch/services/arch.active-user.service';
import { ArchTransactionService, TransactionHeader } from './../../../arch/services/arch.transaction.service';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

interface SocketMessageParams {
  to: string | Array<string>; // Indica los usuarios a los cuales se les notifica un mensaje en concreto
}

interface SocketMessage {
  text: string;
  user: string;
  color: string;
  offrol: boolean;
  params: SocketMessageParams;
}

 const COLORS = ['#EF9A9A', '#F48FB1', '#CE93D8', '#B39DDB', '#9FA8DA', '#90CAF9', '#81D4FA', '#80DEEA', '#80CBC4', '#A5D6A7'];


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
  private offRolActivated: boolean; // Indica si el modo fuera de rol está activado
  private color: string = COLORS[Math.floor(Math.random() * 10)];
  constructor(
    private chatService: ChatSocketService,
    private genericDiceRoller: ArchDiceRollerService,
    private activeUserService: ArchActiveUserService,
    private transactionService: ArchTransactionService,
	private http: Http
  ) {
    this.offRolActivated = false;
    this.activeUserName = this.activeUserService.getActiveUser()['name'];
  
  }
  
  validateKeyDown(event: KeyboardEvent) {
    if (event.code === 'Enter' && event.location === 0) {
      this.sendMessage();
    }
  };
  
  sendMessage() {
    // Expresión regular que controla si el mensaje es un susurro, es decir, si va dirigido a un jugador en especifico
    // Ejemplo: /w Galael 
    
    let socketMessage = {} as SocketMessage;
    socketMessage.offrol = this.offRolActivated;
    socketMessage.color = this.color;
    socketMessage.user = this.activeUserName;

    let whisperRegEx = /\/(w)\s(\w*)\s/ig;
    let whisperUser: string;
    if (whisperRegEx.test(this.messageText)) {
      let user = this.messageText.match(whisperRegEx)[0];
      // Quitamos la w y los espacios en blanco
      user = user.replace('/w', '');
      while (/ /g.test(user)) {
        user = user.replace(/ /g,'');
      };
      this.messageText = this.messageText.replace(whisperRegEx, '');
      whisperUser = user;
    }
    
    socketMessage.text = this.messageText;
    socketMessage.params = {
      to: whisperUser
    }
    // Envia el mensaje al servicio de socket
    this.chatService.sendMessage(socketMessage);
    
    // Expresión Regular: Empieza por 'roll' luego al menos un digito, luego 'D', luego al menos un digito
    let rollRegEx = /\/(roll)\d+(d)\d+/ig;
    if (rollRegEx.test(this.messageText)) {
      let rolls = this.messageText.match(rollRegEx);
      for (let roll of rolls) {
        roll = roll.toLowerCase();
        let numberOfDices = Number(roll.substring(roll.lastIndexOf('l') + 1, roll.indexOf('d')));
        let faces = Number(roll.substring(roll.indexOf('d') + 1, roll.length));
        
        // Se envia un mensaje de texto al chat con el resultado de la tirada
        let rolls: number[] = this.genericDiceRoller.roll(numberOfDices, faces);
        let message: string = this.activeUserName + ' ha lanzado' + numberOfDices + 'D'+ faces + ' obteniendo: ' +  rolls.join(', ');
        socketMessage.text = message;
        socketMessage.offrol = true;
        this.chatService.sendMessage(socketMessage)
      }
    }
    
    this.messageText = '';
  }
  
  // Recurre a la base de datos y descarga el WORD con la partida hasta el momento
  downloadWord() {
    let header = {} as TransactionHeader;
    header.TRANSACTION = 'PRINT_STORY';
    header.USER = this.activeUser;
    let body = {}
    this.transactionService.sendTransaction(header, body)
      .then((response: any) => {
		// Crea un elemento fantasma que es automaticamente clickeado por para iniciar la
		// descarga.
        let element = document.createElement('a');
        element.setAttribute('href', response.BODY.URL);
        element.setAttribute('download', 'story.txt');
      
        element.style.display = 'none';
        document.body.appendChild(element);
      
        element.click();
      
        document.body.removeChild(element); 
      });
  }
  
  ngOnInit() {
    this.connection = this.chatService.getMessages().subscribe(message => {
      if (message instanceof Array) {
        for (let m in message) {
          this.messageArray.push(message[m].chatMessage);
        }
      } else {
        this.messageArray.push(message);
      }
    })
  }
  
  ngOnDestroy() {
    this.connection.unsubscribe();
  }
 }
