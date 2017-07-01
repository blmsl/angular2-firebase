import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../authorization/login/login.component';

const sharedAppRoutes: Routes = [
  { path: '',  redirectTo: '/login', pathMatch : 'full'},
  { path: '**', component: LoginComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(sharedAppRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class SharedRoutingModule {}
