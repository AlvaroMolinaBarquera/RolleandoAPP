import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { ArchConfigurationService } from './arch.configuration.service';
import 'rxjs/add/operator/toPromise';

const STANDAR_NUMBER = 6;
@Injectable()
export class ArchRandomName {
    behindNameURL: string;
    apiKey: string;
    behindNameURLRandom: string;
    constructor(
      private http: Http,
      private configurationService: ArchConfigurationService,
    ) {
      let cfg = this.configurationService.getProperty('behindTheName');
      this.behindNameURL = cfg.rest;
      this.behindNameURLRandom = cfg.restRandom;
      this.apiKey =  cfg.apiKey;
    }

    /** Llama al servicio de Behind the name;
    * @param key: La API Key
    * @param gender: El genero, 'f' para femeninos
    * @param usage: Usado para nombres restringidos.
    * @param number: El numero de nombres devueltos, 6 por defecto, maximo 6.
    * @param surname: Introducir 'yes' para que aparezca un apellido aleatorio.
    */
    getBehindNameRandomName(gender?: string, usage?: string, surname?: boolean, number?: string): Promise<any> {
      let gen = (gender) ? '&gender=' + gender : '';
      let use = (usage) ? '&usage=' + usage : '';
      let sur = (surname) ? '&surname=yes' : '';
      let num = (number) ? '&number=' + number : '&number=' + STANDAR_NUMBER;

      let url = this.behindNameURL + this.behindNameURLRandom + this.apiKey + gen + use + sur + num;
      return this.http.get(url)
           .toPromise()
           .then((response: any) => {
             return this.getNames(response._body);
           })
           .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
      return Promise.reject(error.message || error);
    }

    /**
     * Obtiene los nombres al hacerlos pasar por una epresión regular.
     * @param response La respuesta, en XML de la llamada a BehindTheName;
     * @return Un array con los nombres.
     */
    getNames(response: string): string[] {
      let responseArray: string[] = [];
      var name:  RegExpExecArray;
      // Expresión regular para capturar el interior del contenido
      // Entre dos etiquetas name
      var insideTheTagNameRegExo = /(?:<name>(.*)<\/name>)/g;
      while((name = insideTheTagNameRegExo.exec(response)) !== null) {
        responseArray.push(name[1] || ''); 
      }
      return responseArray;
    }


}
