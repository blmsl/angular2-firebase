import {  NgModule } from '@angular/core';
import {  Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component'
import { CreateNewTourComponent } from './dashboard/create-new-tour/create-new-tour.component'

const adminRoutes: Routes = [
  { path: 'dashboard', component:  DashboardComponent, children: [
    { path: 'create-new-tour', component:  CreateNewTourComponent}
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
