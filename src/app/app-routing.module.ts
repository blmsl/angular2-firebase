import {  NgModule } from '@angular/core';
import {  Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./login/login.component"
import { DashboardComponent } from "./dashboard/dashboard.component"
import { TourListingComponent } from "./tour-listing/tour-listing.component"
import { TourComponent } from "./tour/tour.component"

const appRoutes: Routes = [
  { path: 'login', component:  LoginComponent },
  { path: 'tour-listing', component:  TourListingComponent},
  { path: 'tour', component:  TourComponent },
  { path: '', component: TourListingComponent, pathMatch : 'full', data: { title: 'Dashboard' } },
  { path: '**', component: LoginComponent}
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
