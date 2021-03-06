import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';
import {  ActiveUser } from './../../../arch/services/arch.active-user.service';

import { ArchGenericModalService } from './../../../arch/services/arch.generic-modal.service';
import { ArchTransactionService, TransactionHeader } from './../../../arch/services/arch.transaction.service';
import { ArchTracesService } from './../../../arch/services/arch.traces.service';
import {MODAL_TYPE} from './../../../arch/arch.constants';

import { Router } from '@angular/router';

@Component({
  selector: 'chat-register',
  templateUrl: './chat.register.view.html',
  styleUrls: ['./chat.register.styles.css'],
})

export class ChatRegister {
    newUserForm: FormGroup;
    newUser: ActiveUser;
    checkingUser: boolean = false;
    NAME_ALIAS_MIN_LENGHT: number = 3;
    NAME_ALIAS_MAX_LENGHT: number = 20;
    PASSWORD_MAX_LENGHT: number = 16;
    PASSWORD_MIN_LENGHT: number = 8;
    
    constructor (
    private modalService: ArchGenericModalService,
    private transactionService: ArchTransactionService,
    private router: Router,
    private fb: FormBuilder,
    private tracesService: ArchTracesService,
  ) {

    this.createForm();
  }
  createForm() {
    this.newUserForm = this.fb.group({
      name: [
        '', 
        [Validators.required, 
        Validators.maxLength(this.NAME_ALIAS_MAX_LENGHT), 
        Validators.minLength(this.NAME_ALIAS_MIN_LENGHT),
        ],
        this.alreadyChosen.bind(this),
        
      ],
      password: [
        '', 
        [Validators.required, 
        Validators.maxLength(this.PASSWORD_MAX_LENGHT), 
        Validators.minLength(this.PASSWORD_MIN_LENGHT),
        ],
        
      ],
      confirmPassword:  [
        '', 
        [Validators.required, 
        this.samePassword]
      ],
      alias: [
        '', 
        [ 
        Validators.maxLength(this.NAME_ALIAS_MAX_LENGHT), 
        Validators.minLength(this.NAME_ALIAS_MIN_LENGHT)]
      ],
      color: '',
    })
  }

  samePassword = (control: AbstractControl): any => {
      let confirmPassword = control.value
      if (confirmPassword) {
        let password = this.newUserForm.get('password') || null;
        const samePassword = password.value !== confirmPassword;
        return samePassword ? {'samePassword': {value: control.value}} : null;
      };
      return null;
    };
  

    alreadyChosen = (control: AbstractControl): any => {
     
      let alreadyChosen = control.value;
      if (alreadyChosen && alreadyChosen.length > this.NAME_ALIAS_MIN_LENGHT) {
        let header = {} as TransactionHeader;
        header.TRANSACTION = 'LOGIN';
        let body = {
          USER: alreadyChosen,
        }
        this.checkingUser = true;
        return this.transactionService.sendTransaction(header, body)
          .then((response) => {
            this.checkingUser = false;
            return response.HEADER.SUCCESS ? {'alreadyChosen': {value: control.value}} : null;
          });
      } else {
        return null;
      }
    }

    registerNewUser() {
      let header = {} as TransactionHeader;
      header.TRANSACTION = 'REGISTER';
      let body = {
        USER: this.newUserForm.get('name').value,
        PASSWORD: this.newUserForm.get('password').value,
        CHAT: {
          ALIAS: this.newUserForm.get('alias').value || '', // Paremetro no obligatorio
        }
      }
      this.transactionService.sendTransaction(header, body)
        .then((response: any) => {
          this.tracesService.writeInfo('registerNewUser: Respuesta de nuevo usuario registrado', response)
          if (response.HEADER.SUCCESS === false) {
            this.modalService.openModal(MODAL_TYPE.ERROR, 'Error', response.BODY.ERROR);
          };
          this.modalService.openModal(MODAL_TYPE.INFO, 'EXITO', 'Se ha registrado con exito');
        })
        .catch((error: Error) => {
          this.modalService.openModal(MODAL_TYPE.ERROR, 'ERROR', 'Se ha producido un error generico al ejecutar la operación');
          this.tracesService.writeError('registerNewUser: Se ha producido un error al registrar a un nuevo usuario', error);
        })
    }  
}
