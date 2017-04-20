import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import { LoginComponent } from "./authorization/login/login.component";
import { TourListingComponent } from './user-components/tour-listing/tour-listing.component';
import { TourComponent } from './user-components/tour/tour.component';
import { SharedModule } from './shared/shared.module'
import { AuthServiceService } from './shared/services/auth-service.service'
import { AngularFireModule } from "angularfire2";
import { Constants } from "./shared/core/constants";
import { RegistrationComponent } from './authorization/registration/registration.component';
import { AdminPanelModule } from "./admin-panel/admin-panel.module";
import { MainComponentComponent } from './user-components/main-component/main-component.component'
import {ToursService} from "./shared/services/tours.service";
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TourListingComponent,
    TourComponent,
    RegistrationComponent,
    MainComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AdminPanelModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(Constants.fireBaseConfig)
  ],
  providers: [
    AuthServiceService,
    ToursService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
