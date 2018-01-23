import { Injectable } from '@angular/core';
import { ArchTracesService } from './arch.traces.service';

export interface Chat {
  alias: string;
  master: boolean;
}

export interface ActiveUser {
  name: string,
  lastConnection: number; // Formato timestamp en ms
  chat: Chat
}

@Injectable()
export class ArchActiveUserService {
  activeUser: ActiveUser;
  constructor (private tracesService: ArchTracesService) {}

  setActiveUser(activeUser: ActiveUser) {
    this.activeUser = activeUser;
  }
  
  getActiveUser() {
    return this.activeUser;
  }
}
