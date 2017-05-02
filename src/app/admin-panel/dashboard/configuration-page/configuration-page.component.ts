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

   ngAfterViewInit() {
     $(document).ready(function(){
         $('.collapsible').collapsible();
     });
   }

   onSaveCountry() {
     this.toursService.list('configurations/countries').push({country:this.countryControl}).then((response)=>{
       console.log('response',response);

       this.newAddedCountryKey = `/configurations/countries/${response[response.path.o.length-1]}`;
     });
     this.countryControl = null;
     this.newAddedCountryKey = null;
   }

   onSaveCity(countryKey,cityControlKey,index) {
     let key = this.newAddedCountryKey ? this.newAddedCountryKey : countryKey;
     this.toursService.list(`/configurations/countries/${key}/cities`).push(this.cityControl[cityControlKey]).then(()=>{
       this.cityControl[cityControlKey] = null;
     });
   }

   getCountriesList() {
     this.toursService.list('configurations/countries').subscribe(cities => {

       this.countriesList = cities
       console.log('this.countriesList',this.countriesList);
       $(document).ready(function(){
           $('.collapsible').collapsible();
       });

     })
   }

}
