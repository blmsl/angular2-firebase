import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "../authorization/login/login.component";
import { ModalUsualComponent } from "./components/modal-usual/modal-usual.component";

const sharedAppRoutes: Routes = [
  { path: 'login', component:  LoginComponent},
  { path: 'alert-modal', component: ModalUsualComponent, outlet: 'popUps'},
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
