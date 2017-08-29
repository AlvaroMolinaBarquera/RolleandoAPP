import { Component } from '@angular/core';

import { ArchTracesService } from './../../arch/services/arch.traces.service';
@Component({
  selector: 'test-traces',
  templateUrl: './test.traces.view.html',
})
export class TestTraces  {
  constructor (private tracesService: ArchTracesService)  {
  }

  writeTrace() {
    this.tracesService.writeDebug('Traza de Pruebas', 0);
  }
}
