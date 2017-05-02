import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component'
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { CreateNewTourComponent } from './dashboard/create-new-tour/create-new-tour.component'
import {ReactiveFormsModule} from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { ConfigurationPageComponent } from './dashboard/configuration-page/configuration-page.component'

@NgModule({
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    DashboardComponent,
    CreateNewTourComponent,
    ConfigurationPageComponent
  ],
  exports: [
    DashboardComponent,
    CreateNewTourComponent,
    ConfigurationPageComponent
  ]
})
export class AdminPanelModule { }
