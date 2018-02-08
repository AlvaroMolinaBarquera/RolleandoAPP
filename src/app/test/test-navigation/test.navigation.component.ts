import { Component } from '@angular/core';
import { ArchTaskManagerService } from './../../arch/services/arch-task-manager/arch.task-manager.service';
import { ArchEventsService } from './../../arch/services/arch-events/arch.events.service';

@Component({
  selector: 'test-navigation-one',
  template: `
    <button class="btn btn-default" (click)="navigate()"> Nueva Tarea </button>
    <button class="btn btn-default" (click)="go('testNavigationTwo')"> Navegar a Estado Dos </button>
    `,
})
export class TestNavigatioOne {

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
    navigate(taskName: string) {
        taskName = taskName || 'testNavigationTwo';
        this.taskManagerService.newTask(taskName);
    }
    go(taskName: string) {
        this.taskManagerService.go(taskName);
    }
}

@Component({
    selector: 'test-navigation-two',
    template: `
        <div class="form-group">
            <label>Debe preservarse al volver</label>
            <input class="form-control" type="text"/>
        </div>
        <button class="btn btn-default" (click)="navigate()"> Volver </button>
      `,
  })
  export class TestNavigatioTwo {
      activeTasks: any;
    constructor (
        private taskManagerService: ArchTaskManagerService,
        private eventsService: ArchEventsService,
      )  {
        console.log('Solo debe ejecutarse la primera vez vez')
      }
      navigate() {
          this.taskManagerService.go('testNavigationOne');
      }
  }
  