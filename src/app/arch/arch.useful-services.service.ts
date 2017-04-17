import { Injectable } from '@angular/core';

@Injectable()
export class ArchUsefulServices {

  updateNPCName(NPCName: string) {
    let returnedNPCName;
    if (NPCName.indexOf('#') != -1) {
      let n: any = NPCName.substring(NPCName.indexOf('#') + 1, NPCName.length);
      n = Number(n);
      n++;
      returnedNPCName = NPCName.substring(0, NPCName.indexOf('#') + 1) + n;
    } else {
      returnedNPCName = NPCName;
    }
      return returnedNPCName
  }
}
