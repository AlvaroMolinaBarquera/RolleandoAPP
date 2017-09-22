import { Injectable } from '@angular/core';
import { ArchTracesService } from './arch.traces.service';

export interface ActiveUser {
  name: string,
  lastConnection: number; // Formato timestamp en ms
  chat: {
    alias: string;
    master: boolean;
  }
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
