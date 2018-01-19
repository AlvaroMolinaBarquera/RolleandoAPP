import { Injectable } from '@angular/core';

@Injectable()
export class ArchUtilsService{

  /**
   * Sirve para añadir diferentes NPCs con el mismo nombre
   * conatenando tras una almohadilla el numero siguiente
   * @param NPCName Nombre del NPC
   */
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
   * Ofrece como descarga un texto que se le pase
   * @param fileName Nombre del archivo, con el que se va descargar ejemplo "story.txt";
   * @param type Tipo del archivo ".txt", ".csv", ".xlxs"
   * @param data Elemento a descargar
   */
  offerDownload(fileName: string, type: string, data: string) {
    try {
      // Transformamos en un blob los datas pasados
      let blob = new Blob([data], { type: 'data:attachment/' + type});
      // Si el anvegador tiene la opción la usamos (IE)
      if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, fileName);
      } else {
        // De lo contrario creamos un elemento fantasma que es clickeado
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
