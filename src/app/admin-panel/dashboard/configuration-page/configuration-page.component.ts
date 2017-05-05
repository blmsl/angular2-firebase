import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToursService} from "../../../shared/services/tours.service";
declare let $:any;

@Component({
  selector: 'app-configuration-page',
  templateUrl: './configuration-page.component.html',
  styleUrls: ['./configuration-page.component.scss']
})
export class ConfigurationPageComponent implements OnInit, AfterViewInit{
   countryControl;
   cityControl = {};
   countriesList;
   newAddedCountryKey;

   constructor(public fb:FormBuilder,
                public toursService:ToursService) { }

   ngOnInit() {
     this.getCountriesList();
   }

   ngAfterViewInit() {}

   onSaveCountry() {
     this.toursService.list('configurations/countries').push({country:this.countryControl}).then((response)=>{
       this.newAddedCountryKey = response[response.path.o.length-1];
     });
     this.countryControl = null;
     this.newAddedCountryKey = null;
   }

   onSaveCity(countryKey,cityControlKey) {
     let key = this.newAddedCountryKey ? this.newAddedCountryKey : countryKey;
     this.toursService.list(`/configurations/countries/${key}/cities`).push(this.cityControl[cityControlKey]).then((responseCity)=>{
       this.getCountriesList();
       this.cityControl[cityControlKey] = null;
     });
   }

   getCountriesList() {
     this.toursService.list('configurations/countries').subscribe(countriesWithCities => {
       this.countriesList = countriesWithCities;
       $(document).ready(function(){
           $('.collapsible').collapsible();
       });

     })
   }

}
