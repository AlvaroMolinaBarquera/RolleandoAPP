import { NgModule }                from '@angular/core';
import { RouterModule, Routes }    from '@angular/router';

import { AppError404 } from './app.error-404.component';

const appRoutes: Routes = [
  { path: '',   redirectTo: '/generic-random-name-generator', pathMatch: 'full' },
  { path: '**',   component: AppError404 },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
