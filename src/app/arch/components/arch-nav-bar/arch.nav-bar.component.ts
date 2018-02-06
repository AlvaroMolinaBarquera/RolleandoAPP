import { Component } from '@angular/core';
import { ArchTaskManagerService } from './../../services/arch-task-manager/arch.task-manager.service';

@Component({
  selector: 'arch-nav-bar',
  templateUrl: './arch.nav-bar.view.html',
})
export class ArchNavBar {
  constructor(
      private taskManagerService: ArchTaskManagerService,
  ) {
  }
}
