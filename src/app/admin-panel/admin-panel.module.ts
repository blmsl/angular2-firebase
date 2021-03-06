import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { CreateNewTourComponent } from './dashboard/create-new-tour/create-new-tour.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MaterializeModule } from 'ng2-materialize';
import { ConfigurationPageComponent } from './dashboard/configuration-page/configuration-page.component';
import { OrdersListComponent } from './dashboard/orders-list/orders-list.component';


@NgModule({
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    MaterializeModule.forRoot(),
  ],
  declarations: [
    DashboardComponent,
    CreateNewTourComponent,
    ConfigurationPageComponent,
    OrdersListComponent
  ],
  exports: [
    DashboardComponent,
    CreateNewTourComponent,
    ConfigurationPageComponent,
    OrdersListComponent
  ]
})
export class AdminPanelModule { }
