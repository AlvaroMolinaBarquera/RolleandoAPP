import { Component } from '@angular/core';
import { ArchTaskManagerService } from './../../services/arch-task-manager/arch.task-manager.service';
import { ArchEventsService } from './../../services/arch-events/arch.events.service';

@Component({
  selector: 'arch-task-list',
  templateUrl: './arch.task-list.view.html',
  styleUrls: ['./arch.task-list.styles.css'],
})
export class ArchTaskList {
    /** Array con un array de rutas */
    taskList: any[] = [];
  constructor(
      private taskManagerService: ArchTaskManagerService,
      private eventsService: ArchEventsService,
  ) {
        this.eventsService.on('arch.activeTasks')
        .subscribe((actTask) => {
            this.taskList = actTask[0];
        });
  }
}
