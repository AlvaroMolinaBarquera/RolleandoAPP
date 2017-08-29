import { NgModule }                from '@angular/core';
import { RouterModule, Routes }    from '@angular/router';

import { AppError404 } from './app.error-404.component';
import { TestComponent } from './test/test.component';
import { ChatComponent } from './chat/chat.component';

const appRoutes: Routes = [
  { path: '',   redirectTo: '/generic-random-name-generator', pathMatch: 'full' },
  { path: 'test', component: TestComponent },
  { path: '**',   component: AppError404 },
  { path: 'chat', component: ChatComponent }
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
