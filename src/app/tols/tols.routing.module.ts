import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TolsDiceRoller } from './tols-dice-roller/tols.dice-roller.component';
import { TolsInitiativeTracker } from './tols-initiative-tracker/tols.initiative-tracker.component';
import { TolsRandomNameGenerator } from './tols-random-name-generator/tols.random-name-generator.component';
import { TolsCharacterManager } from './tols-character-manager/tols.character-manager.component';
import { TolsStickyNotes } from './tols-sticky-notes/tols.sticky-notes.component';

const tolsRoutes: Routes = [
  {
    path: 'generic-dice-roller',
    name: 'genericDiceRoller',
    component: TolsDiceRoller,
  },
  {
    path: 'generic-initiative-tracker',
    name: 'genericInitiativeTracker',
    component: TolsInitiativeTracker,
  },
  {
    path: 'generic-random-name-generator',
    name: 'genericRandomNameGenerator',
    component: TolsRandomNameGenerator,
  },
  {
    path: 'generic-character-manager',
    name: 'genericCharacterManager',
    component: TolsCharacterManager,
  },
  {
      path: 'sticky-notes',
      name: 'stickyNotes',
      component: TolsStickyNotes,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(tolsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class TolsRoutingModule { }
