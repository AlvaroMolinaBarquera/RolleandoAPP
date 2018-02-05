import { Component } from '@angular/core';
import { ArchEventsService } from './arch/services/arch-events/arch.events.service';
import { ArchTaskManagerService } from './arch/services/arch-task-manager/arch.task-manager.service';
@Component({
  selector: 'my-app',
  template: `
  <nav class="navbar navbar-toggleable-md navbar-light bg-primary">
  <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <a class="navbar-brand" href="#">ROLLEANDO</a>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" routerLink="anbf">Anima: BF</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" routerLink="test">TEST</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" routerLink="chat">CHAT</a>
      </li>
      <li class="nav-item dropdown">
      <div ngbDropdown class="d-inline-block nav-link">
        <a  id="actionsDropdownds" ngbDropdownToggle>Genericas</a>
        <div class="dropdown-menu" aria-labelledby="actionsDropdownds">
          <button class="dropdown-item"> <a routerLink="generic-initiative-tracker">Seguimiento de Iniciativas </a></button>
          <button class="dropdown-item" > <a routerLink="generic-dice-roller">Lanzador de Dados </a> </button>
          <button class="dropdown-item" > <a routerLink="generic-random-name-generator">Generador de Nombres </a> </button>
          <button class="dropdown-item" > <a routerLink="generic-character-manager"> Gestionador de Personajes </a> </button>
          <button class="dropdown-item" > <a routerLink="sticky-notes"> Notas </a> </button>
        </div>
      </div>
      </li>
      <li class="nav-item">
        <tols-recorder></tols-recorder>
      </li>
    </ul>
  </div>
</nav>
<div class="container-fluid">
  <div class="row">
    <div class="col-md-1" style="background-color: black;">
      <ul class="list-group">
        <li  class="list-group-item" *ngFor="let task of taskList" (click)="taskManager.go(task.name)"> 
          {{ task.name }}
          <button type="button" class="close" aria-label="Close" (click)="taskManager.removeTask(task)">
            <span aria-hidden="true">&times;</span>
          </button>
        </li>
      </ul> 
    </div>
    <div class="col-md-11">
      <router-outlet></router-outlet>
    </div>
  </div>
</div>`
})
export class AppComponent  {
  taskList: any;
  constructor(private eventsService: ArchEventsService, private taskManager: ArchTaskManagerService) {
    this.eventsService.on('arch.activeTasks')
    .subscribe((actTask) => {
        console.info('Se han actualizado las tareas, info recibida', actTask)
        this.taskList = actTask[0];
    });
  }
  
}
