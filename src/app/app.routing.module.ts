import { NgModule }                from '@angular/core';
import { RouterModule, Routes }    from '@angular/router';

import { AppError404 } from './app.error-404.component';
import { TestComponent } from './test/test.component';

const appRoutes: Routes = [
  { path: '',   redirectTo: '/generic-random-name-generator', pathMatch: 'full' },
  { path: 'test', component: TestComponent },
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
