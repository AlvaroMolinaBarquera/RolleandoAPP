import { Component } from '@angular/core';
import { ArchTaskManagerService } from './../../arch/services/arch-task-manager/arch.task-manager.service';
import { ArchEventsService } from './../../arch/services/arch-events/arch.events.service';

@Component({
  selector: 'test-navigation-one',
  template: `
    <ul>
        <li *ngFor="let task of activeTasks"> {{task.name}} </li>
    </ul>
    <button class="btn btn-default" (click)="navigate()">Navegar a Ventana Dos </button>
    `,
})
export class TestNavigatioOne{

    activeTasks: any;
  constructor (
      private taskManagerService: ArchTaskManagerService,
      private eventsService: ArchEventsService,
    )  {
      this.eventsService.on('arch.activeTasks')
        .subscribe((actTask) => {
            console.info('Se han actualizado las tareas, info recibida', actTask)
            this.activeTasks = actTask[0];
        });
    }

    navigate() {
        this.taskManagerService.newTask('testTable')
    }
}
