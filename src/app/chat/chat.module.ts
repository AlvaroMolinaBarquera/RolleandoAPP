import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { ArchModule } from './../arch/arch.module';

// Componentes
import { ChatMessageInput } from './components/chat-message-input/chat.message-input.component';
import { ChatLogin } from './components/chat-login/chat.login.component';
import { ChatRegister } from './components/chat-register/chat.register.component';
// Servicios
import { ChatSocketService } from './services/chat.socket.service';


import { ChatComponent } from './chat.component';

import { ChatRoutingModule } from './chat.routing.module';

@NgModule({
  imports:      [ BrowserModule, FormsModule, NgbModule, ArchModule, HttpModule, ChatRoutingModule, ReactiveFormsModule ],
  providers: [ ChatSocketService ],
  declarations: [ ChatComponent, ChatMessageInput, ChatLogin, ChatRegister ],
  exports:      [ ChatComponent ],
})
export class ChatModule {}
