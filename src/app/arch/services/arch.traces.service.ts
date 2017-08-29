import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

  enum TRACES_LEVEL {
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
  constructor (private http: Http) {
    this.tracesServiceURL = 'http://localhost:3333/api/traces';
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
  
  private writeTrace = (message: string, level: TRACES_LEVEL, params?: any) => {
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
        console[this.getLevel(level)](message, params);
        this.http.post(this.tracesServiceURL, traceToLog)
          .toPromise();
      });
  }
  
  getFile(stackFrameArray: Array<StackFrame>) {
    if (stackFrameArray && stackFrameArray[2]) {
      // El numero 0 se corresponde a writeTrace
      // El numero 1 se corresponde a writeInfo/Debug/Warn/Trace
      // El numero 2 es el archivo que lo llama
      return stackFrameArray[2].functionName || '';
    };
  }
  getLevel(level: TRACES_LEVEL): string {
    let levels = ['error', 'warn', 'info', 'log'];
    return levels[level] || 'log';
  }
}
