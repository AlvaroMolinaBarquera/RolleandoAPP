import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<nav class="navbar navbar-toggleable-md navbar-light bg-faded">
  <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <a class="navbar-brand" href="#">Navbar</a>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">TODO</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">TODO</a>
      </li>
      <li class="nav-item dropdown">
      <div ngbDropdown class="d-inline-block nav-link">
        <a  id="actionsDropdownds" ngbDropdownToggle>Genericas</a>
        <div class="dropdown-menu" aria-labelledby="actionsDropdownds">
          <button class="dropdown-item"> <a routerLink="generic-initiative-tracker">Seguimiento de Iniciativas </a></button>
          <button class="dropdown-item" > <a routerLink="generic-dice-roller">Lanzador de Dados </a> </button>
          <button class="dropdown-item" > <a routerLink="generic-random-name-generator">Generador de Nombres </a> </button>

        </div>
      </div>
      </li>
    </ul>
  </div>
</nav>
<router-outlet></router-outlet>`,
})
export class AppComponent  { config = {allowEdit: true, allowDelete: true} }