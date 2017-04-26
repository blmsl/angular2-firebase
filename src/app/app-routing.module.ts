import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./authorization/login/login.component"
import { TourListingComponent } from "./user-components/tour-listing/tour-listing.component"
import { TourComponent } from "./user-components/tour/tour.component"
import { RegistrationComponent } from "./authorization/registration/registration.component"
import { MainComponentComponent } from "./user-components/main-component/main-component.component"
import { CanActiveService } from "./shared/services/can-active.service"
import { ModalUsualComponent } from "./shared/components/modal-usual/modal-usual.component";

const appRoutes: Routes = [
  { path: 'login', component:  LoginComponent},
  { path: 'registration',canActivate:[CanActiveService], component:  RegistrationComponent },
  { path: 'portal', component:   MainComponentComponent, children: [
    { path: 'tour-listing', component:  TourListingComponent},
    { path: 'tour', component:  TourComponent },
    { path: '**', redirectTo: '/portal/tour-listing'},
  ]},
  { path: '',  redirectTo: '/portal/tour-listing', pathMatch : 'full'},
  { path: '**', component: MainComponentComponent}
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
