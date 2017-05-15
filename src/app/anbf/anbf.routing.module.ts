import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AnbfCombatManager} from './anbf-combat-manager/anbf.combat-manager.component';

const animaRoutes: Routes = [
  {
    path: 'anbf',
    component: AnbfCombatManager,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(animaRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AnbfRoutingModule { }
