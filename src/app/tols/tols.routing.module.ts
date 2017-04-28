import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TolsDiceRoller } from './tols-dice-roller/tols.dice-roller.component';
import { TolsInitiativeTracker } from './tols-initiative-tracker/tols.initiative-tracker.component';
import { TolsRandomNameGenerator } from './tols-random-name-generator/tols.random-name-generator.component';
import { TolsCharacterManager } from './tols-character-manager/tols.character-manager.component';

const crisisCenterRoutes: Routes = [
  {
    path: 'generic-dice-roller',
    component: TolsDiceRoller,
  },
  {
    path: 'generic-initiative-tracker',
    component: TolsInitiativeTracker,
  },
  {
    path: 'generic-random-name-generator',
    component: TolsRandomNameGenerator,
  },
  {
    path: 'generic-character-manager',
    component: TolsCharacterManager,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(crisisCenterRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class TolsRoutingModule { }
