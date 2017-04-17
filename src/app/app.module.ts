import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MaterializeModule } from 'ng2-materialize';
import { AppRoutingModule } from "./app-routing.module";
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { TourListingComponent } from './tour-listing/tour-listing.component';
import { TourComponent } from './tour/tour.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    TourListingComponent,
    TourComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterializeModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
