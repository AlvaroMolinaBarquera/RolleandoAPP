import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChatComponent } from './chat.component';

import { ChatMessageInput } from './components/chat-message-input/chat.message-input.component';
import { ChatLogin} from './components/chat-login/chat.login.component';
import { ChatRegister } from './components/chat-register/chat.register.component';
import { ArchAuthGuard } from './../arch/guards/arch.auth.guard';

const chatRoutes: Routes = [
  {
    path: 'login',
    component: ChatLogin,
  }, {
    path: 'chat',
    component: ChatMessageInput,
    canActivate: [ArchAuthGuard]
  }, {
    path: 'register',
    component: ChatRegister,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(chatRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ChatRoutingModule { }
