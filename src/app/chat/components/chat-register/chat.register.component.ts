import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';
import {  ActiveUser } from './../../../arch/services/arch.active-user.service';

import { ArchGenericModalService } from './../../../arch/services/arch.generic-modal.service';
import { ArchTransactionService, TransactionHeader } from './../../../arch/services/arch.transaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'chat-register',
  templateUrl: './chat.register.view.html',
  styleUrls: ['./chat.register.styles.css'],
})

export class ChatRegister {
    newUserForm: FormGroup;
    newUser: ActiveUser;
    NAME_ALIAS_MIN_LENGHT: number = 3;
    NAME_ALIAS_MAX_LENGHT: number = 20;
    PASSWORD_MAX_LENGHT: number = 16;
    PASSWORD_MIN_LENGHT: number = 8;
    
    constructor (
    private modalService: ArchGenericModalService,
    private transactionService: ArchTransactionService,
    private router: Router,
    private fb: FormBuilder,
    
  ) {

    this.createForm();
  }
  createForm() {
    this.newUserForm = this.fb.group({
      name: [
        '', 
        [Validators.required, 
        Validators.maxLength(this.NAME_ALIAS_MAX_LENGHT), 
        Validators.minLength(this.NAME_ALIAS_MIN_LENGHT)]
      ],
      password: [
        '', 
        [Validators.required, 
        Validators.maxLength(this.PASSWORD_MAX_LENGHT), 
        Validators.minLength(this.PASSWORD_MIN_LENGHT)]
      ],
      confirmPassword:  [
        '', 
        [Validators.required, 
        Validators.maxLength(this.PASSWORD_MAX_LENGHT), 
        Validators.minLength(this.PASSWORD_MIN_LENGHT), 
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
  
    registerNewUser() {
      let header = {} as TransactionHeader;
      header.TRANSACTION = 'REGISTER';
      let body = {
        NAME: this.newUserForm.get('name').value,
        PASSWORD: this.newUserForm.get('password').value,
        ALIAS: this.newUserForm.get('alias').value || '', // Paremetro no obligatorio
      }
      this.transactionService.sendTransaction(header, body)
        .then((response: any) => {

        })
        .catch((error: Error) => {
          console.log(error);
        })
    }  
}
