import { Component } from '@angular/core';
import { ArchGenericModalService } from './../../../arch/services/arch.generic-modal.service';
import { ArchTransactionService, TransactionHeader } from './../../../arch/services/arch.transaction.service';
import { ArchActiveUserService, ActiveUser } from './../../../arch/services/arch.active-user.service';
import { Router } from '@angular/router';
import {MODAL_TYPE} from './../../../arch/arch.constants';
@Component({
  selector: 'chat-login',
  templateUrl: './chat.login.view.html',
  styleUrls: ['./chat.login.styles.css'],
})

export class ChatLogin {
  user: string; // Usuario
  password: string; // Contraseña, maximo 8 caracteres
  constructor (
    private modalService: ArchGenericModalService,
    private transactionService: ArchTransactionService,
    private router: Router,
    private activeUserService: ArchActiveUserService
  ) {}
  
  login() {
    let head = {} as TransactionHeader;
    head.TRANSACTION = 'LOGIN';  
    let body = {
      USER: this.user,
      PASSWORD: this.password,
    };
    this.transactionService.sendTransaction(head, body)
      .then((response: any) => {
        if (response.HEADER.SUCCESS === true) {
          // Si el login es correcto colocamos como usuario activo al usuario que se ha logeado
          let activeUser = {} as ActiveUser;
          activeUser.name = response.BODY.USER;
          activeUser.lastConnection = response.BODY.LAST_CONNECTION;
          activeUser.chat = {
            alias: response.BODY.CHAT.ALIAS,
            master: response.BODY.CHAT.MASTER,
          }
          this.activeUserService.setActiveUser(activeUser);
          // Navegamos a chat
          this.router.navigate(['/chat']);
        } else {
          // Si no ha introducido lso campos correctos mostramos un error
          this.modalService.openModal(MODAL_TYPE.ERROR, 'ERROR', 'El usuario o la contraseña son incorrectos');
        }
      })
    
  }
}
