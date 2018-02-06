import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
<arch-nav-bar></arch-nav-bar>
<div class="container-fluid">
  <div class="row">
    <div class="col-md-1" style="background-color: #6A1B9A;">
      <arch-task-list></arch-task-list>
    </div>
    <div class="col-md-11">
      <router-outlet></router-outlet>
    </div>
  </div>
</div>`
})
export class AppComponent  {}

@Component({
  selector: 'blank',
  template: '<!-- Vista Vacia -->',
})
export class BlankComponent {}