import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ArchConfigurationService } from './arch.configuration.service';
import 'rxjs/add/operator/toPromise';

  export enum TRACES_LEVEL {
    ERROR,
    WARN,
    INFO,
    DEBUG
  };
  
  interface TRACE {
    LEVEL: TRACES_LEVEL;
    USER: string;
    FILE: string;
    MESSAGE: string;
    PARAMS: any;
  }
  interface StackFrame {
    fileName: string;
    functionName: string;
    source: string;
  };

  let StackTrace = require('stacktrace');

@Injectable()
export class ArchTracesService {
  tracesServiceURL: string;
  write: any;
  constructor (
    private http: Http,
    private configurationService: ArchConfigurationService
  ) {
    let node = this.configurationService.getProperty('node');
    this.tracesServiceURL =  './api/traces';
    this.write = {
      debug: this.writeDebug,
      info: this.writeInfo,
      warn: this.writeWarn,
      error: this.writeError
    };
 }
  
  // Escribe trazas en el nivel de DEBUG
  public writeDebug = (message: string, params?: any) => {
    this.writeTrace(message, TRACES_LEVEL.DEBUG, params);
  }
  // Escribe trazas en el nivel de INFO
  public writeInfo = (message: string, params?: any) => {
      this.writeTrace(message, TRACES_LEVEL.INFO, params);
  };
  
  // Escribe trazas en el nivel de WARN
  public writeWarn = (message: string, params?: any) => {
    this.writeTrace(message, TRACES_LEVEL.WARN, params);
  };
  
  // Escribe trazas en el nivel de ERROR
  public writeError = (message: string, params?: any) => {
    this.writeTrace(message, TRACES_LEVEL.ERROR, params);
  };
  
  private writeTrace = (message: string, level: TRACES_LEVEL, params?: any): void => {
    // Utilizamos StackTrace para recuperar la traza desde donde llaman a esta función
    StackTrace.get()
      .then((response: Array<StackFrame>) => {
        let traceToLog = {} as TRACE;
        traceToLog.LEVEL = level;
        traceToLog.USER = '    ';
        traceToLog.FILE = this.getFile(response);
        traceToLog.MESSAGE = message;
        traceToLog.PARAMS = params;
        // Mostramos el mensaje por consola
        let strLevel = this.getLevel(traceToLog.LEVEL);
        console[strLevel](traceToLog.FILE + ':' + message, params);
        // Se realiza la petición POST
        this.http.post(this.tracesServiceURL, traceToLog)
          .toPromise();
      });
  }
  
  getFile(stackFrameArray: Array<StackFrame>) {
    let file = '';
    if (stackFrameArray && stackFrameArray[2]) {
      // El numer o 0 se corresponde a writeTrace
      // El numero 1 se corresponde a writeInfo/Debug/Warn/Trace
      // El numero 2 es el archivo que lo llama
      let functionName = stackFrameArray[2].functionName;
      // Quita todo el contenido de los parentesis    
      file = functionName.substr(0, functionName.indexOf("(")).trim();
    };
    return file;
  }
  getLevel(level: TRACES_LEVEL): string {
    let levels = ['error', 'warn', 'info', 'debug'];
    return levels[level] || 'debug';
  }
}
