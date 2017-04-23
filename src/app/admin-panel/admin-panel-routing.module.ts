import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component'
import { CreateNewTourComponent } from './dashboard/create-new-tour/create-new-tour.component'
import { CanActiveService } from "../shared/services/can-active.service"

const adminRoutes: Routes = [
  { path: 'dashboard', component:  DashboardComponent, canActivate:[CanActiveService], children: [
    { path: 'create-new-tour', canActivate:[CanActiveService] ,component:  CreateNewTourComponent}
  ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AdminPanelRoutingModule {}