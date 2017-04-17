import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { TourListingComponent } from './tour-listing/tour-listing.component';
import { TourComponent } from './tour/tour.component';
import { SharedModule } from './shared/shared.module'

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
    SharedModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
