import { Injectable } from '@angular/core';

@Injectable()
export class ArchUsefulServices {

  updateNPCName(NPCName: string) {
    let returnedNPCName;
    if (NPCName.indexOf('#') !== -1) {
      let n: any = NPCName.substring(NPCName.indexOf('#') + 1, NPCName.length);
      n = Number(n);
      n++;
      returnedNPCName = NPCName.substring(0, NPCName.indexOf('#') + 1) + n;
    } else {
      returnedNPCName = NPCName;
    }
      return returnedNPCName;
  }

  /**
   * 
   * @param base64 
   */
  offerDownload(fileName: string, type: string, data: string) {
    try {
      let blob = new Blob([data], { type: 'data:attachment/' + type});
      if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, fileName);
      } else {
        let objectUrl = URL.createObjectURL(blob);
        let anchor = document.createElement('a');
        anchor.style.display = 'none';
        anchor.download = fileName;
        anchor.href = objectUrl;
        anchor.click();
      }
    } catch {

    }

  }
}
