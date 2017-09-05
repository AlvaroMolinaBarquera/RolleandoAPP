import { Injectable } from '@angular/core';
import { ArchTracesService } from './arch.traces.service';

export interface ActiveUser {
  name: string,
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
