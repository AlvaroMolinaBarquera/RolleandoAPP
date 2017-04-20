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

    /* Llama al servicio de Behind the name;
    * @Params {string} key: La API Key
    * @Params {string} gender: El genero, 'f' para femeninos
    * @Params {string} usage: Usado para nombres restringidos.
    * @Params {string} number: El numero de nombres devueltos, 6 por defecto, maximo 6.
    * @Params {string} surname: Introducir 'yes' para que aparezca un apellido aleatorio.
    */
    getBehindNameRandomName(gender?: string, usage?: string, number?: string, surname?: boolean): Promise<any> {
      let gen = (gender) ? '&gender=' + gender : '';
      let use = (usage) ? '&usage=' + usage : '';
      let sur = (surname) ? '&surname=yes' : '';
      let num = (number) ? '&number='+ number : '&number=6';



      let url = this.behindNameURL + this.behindNameURLRandom + this.apiKey + gen + use + sur + num;
      return this.http.get(url)
           .toPromise()
           .then((response: any) => {
             return this.getNames(response._body);
           })
           .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }

    getNames(response: string) {
      return response.match(/([A-Z])\w+/g);
    }


}
