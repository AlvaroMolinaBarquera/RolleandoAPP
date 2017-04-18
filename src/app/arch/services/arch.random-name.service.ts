import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ArchRandomName {
    behindNameURL: string;
    apiKey: string;
    behindNameURLRandom: string;
    constructor(private http: Http) {
      this.behindNameURL = 'https://www.behindthename.com/api/';
      this.behindNameURLRandom = 'random.php';
      this.apiKey = '?key=ga395499';

    }

    getBehindNameRandomName(): Promise<string> {
      /* Llama al servicio de Behind the name;
      * @Params {string} key: La API Key
      * @Params {string} gender: El genero, 'f' para femeninos
      * @Params {string} usage: Usado para nombres restringidos.
      * @Params {string} number: El numero de nombres devueltos, 2 por defecto, maximo 6.
      * @Params {string} randomsurname: Introducir 'yes' para que aparezca un apellido aleatorio.
      */
      let url = this.behindNameURL + this.behindNameURLRandom + this.apiKey;
      return this.http.get(url)
           .toPromise()
           .then((response: any) => {
             // TODO Implementar la transformación de JSON a XML;
             console.log(response);
             return response
           })
           .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }
}
