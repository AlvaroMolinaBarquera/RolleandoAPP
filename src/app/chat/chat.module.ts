import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { ArchModule } from './../arch/arch.module';

// Componentes
import { ChatMessageInput } from './components/chat-message-input/chat.message-input.component';
import { ChatLogin } from './components/chat-login/chat.login.component';
import { ChatSocketService } from './services/chat.socket.service';


import { ChatComponent } from './chat.component';

import { ChatRoutingModule } from './chat.routing.module';

@NgModule({
  imports:      [ BrowserModule, FormsModule, NgbModule, ArchModule, HttpModule, ChatRoutingModule ],
  providers: [ ChatSocketService ],
  declarations: [ ChatComponent, ChatMessageInput, ChatLogin ],
  exports:      [ ChatComponent ],
})
export class ChatModule {}
