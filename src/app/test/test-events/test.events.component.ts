import { Component } from '@angular/core';

import { ArchEventsService } from './../../arch/services/arch-events/arch.events.service';

@Component({
  selector: 'test-events',
  templateUrl: './test.events.view.html',
})
export class TestEvents  {
  constructor (private eventsService: ArchEventsService)  {
    
    this.eventsService.on('loremIpsum')
        .subscribe((args: any[]) => {   
          console.log("PARAM",  args)
        },
        (error: any) => {
          console.log("ERROR", error)
        },
        (complete: any) => {
          console.log("COMPLETE", complete)
        })
  }

  emit(){
      this.eventsService.broadcast('loremIpsum', 'Dolor sit amet');
  }
 
}
