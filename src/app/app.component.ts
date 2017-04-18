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
        <a  id="actionsDropdownds" ngbDropdownToggle>Herramientas</a>
        <div class="dropdown-menu" aria-labelledby="actionsDropdownds">
          <button class="dropdown-item"> Seguimiento de Iniciativas </button>
          <button class="dropdown-item"> Lanzador de Dados </button>
        </div>
      </div>
      </li>
    </ul>
  </div>
</nav>
  <tols-random-name-generator></tols-random-name-generator>
  <anbf-combat-manager></anbf-combat-manager>
  <tols-initiative-tracker></tols-initiative-tracker><tols-dice-roller></tols-dice-roller><arch-table [tableConfiguration]="config"></arch-table>`,
})
export class AppComponent  { config = {allowEdit: true, allowDelete: true} }
