import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component'
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { CreateNewTourComponent } from './dashboard/create-new-tour/create-new-tour.component'
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    ReactiveFormsModule
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
