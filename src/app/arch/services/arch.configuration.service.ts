import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class ArchConfigurationService {
    private config: Object = null;
    private env:    Object = null;

  constructor (
    private http: Http,
  ) { }

    /**
    * Permite recuperar una propiedad en concreto.
    * Normalmente será una string, pero tambien puede ser un objeto
    * @param key La propiedad a buscar en la configuración.
    */
    public getProperty(key: string): any {
        return this.config[key];
    }

    /**
     * Obtiene el entorno, se usa para obtener el entorno del primer archivo
     * sus posibles valores son 'devolpment' y 'production';
     */
    public getEnv(): string {
        return this.env['env'];
    }

    /**
     *  El metodo carga el archivo "env.json" para obtener el entorno actual. (Ej: 'production', 'development' )
     *  Luego para dicho entorno carga la configuración correspondiente "[env].config.json"  (Ej: 'development.config.json')
     */
    public load() {
        return new Promise((resolve, reject) => {
            this.http.get('./enviroments/env.json')
            .map( res => res.json() )
            .catch((error: any):any => {
                console.log('Configuration file "env.json" could not be read');
                resolve(true);
                return Observable.throw(error || 'Server error');
            }).subscribe( (envResponse) => {
                this.env = envResponse;
                let request:any = null;
                let enviro = this.getEnv();
                switch (enviro) {
                    case 'production': 
                        request = this.http.get('/enviroments/' + enviro + '.config.json');
                    break;

                    case 'development': 
                        request = this.http.get('./enviroments/' + enviro + '.config.json');
                    break;

                    default: 
                        console.error('Environment file is not set or invalid');
                        resolve(true);
                    break;
                }
                if (request) {
                    request
                        .map( (res: any) => res.json() )
                        .catch((error: any) => {
                            console.error('Error reading ' + enviro + ' configuration file');
                            resolve(error);
                            return Observable.throw(error || 'Server error');
                        })
                        .subscribe((responseData: any) => {
                            this.config = responseData;
                            resolve(true);
                        });
                } else {
                    console.error('Env config file "env.json" is not valid');
                    resolve(true);
                }
            });

        });
    }
  }
