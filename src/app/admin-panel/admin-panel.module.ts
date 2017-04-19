import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component'
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { CreateNewTourComponent } from './dashboard/create-new-tour/create-new-tour.component'

@NgModule({
  imports: [
    CommonModule,
    AdminPanelRoutingModule
  ],
  declarations: [
    DashboardComponent,
    CreateNewTourComponent
  ],
  exports: [
    DashboardComponent,
    CreateNewTourComponent
  ]
})
export class AdminPanelModule { }
