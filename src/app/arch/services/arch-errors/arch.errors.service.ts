import { Injectable } from '@angular/core';
import { ArchTracesService } from './../arch.traces.service';
import { ARCH_ERRORS } from './arch.errors.constants';
import * as _ from 'lodash';

const NOT_FOUND = 'Sin descripción asociada';
@Injectable()
export class ArchErrorsService {
  constructor (private tracesService: ArchTracesService) {}

  /** 
   * Obtiene la descripción de un error en base a su codigo
   * @param errorCode El codigo del error.
   * @return Descripción del Error
   */
  getErrorDescription(errorCode: string) {
    let error = _.find(ARCH_ERRORS, {CODE: errorCode});
    return error.DESCRIPTION || NOT_FOUND;
  }
}
