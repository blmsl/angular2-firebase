import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToursService} from "../../../shared/services/tours.service";
declare let $: any;

@Component({
  selector: 'app-configuration-page',
  templateUrl: './configuration-page.component.html',
  styleUrls: ['./configuration-page.component.scss']

})
export class ConfigurationPageComponent implements OnInit {
  countryControl;
  servicesControl;
  cityControl = {};

  countriesList = [];
  servicesList = [];

  newAddedCountryKey;

  constructor(public fb: FormBuilder,
              public toursService: ToursService) {}

  ngOnInit() {
    this.getCountriesList();
    this.getServicesList();
  }

  onSaveCountry() {
    this.toursService.list('configurations/countries').push({country: this.countryControl}).then((response) => {
      this.newAddedCountryKey = response[response.path.o.length - 1];
    });
    this.countryControl = null;
    this.newAddedCountryKey = null;
  }

  onSaveService() {
    this.toursService.list('configurations/hotelServices').push({title: this.servicesControl}).then(() => {
      this.servicesControl = null;
    })
  }

  getServicesList() {
    this.toursService.list('configurations/hotelServices').subscribe(servicesList => {
      this.servicesList = servicesList;
    })
  }

  onSaveCity(countryKey, cityControlKey) {
    let key = this.newAddedCountryKey ? this.newAddedCountryKey : countryKey;
    this.toursService.list(`/configurations/countries/${key}/cities`).push(this.cityControl[cityControlKey]).then((responseCity) => {
      this.getCountriesList();
      this.cityControl[cityControlKey] = null;
    });
  }

  getCountriesList() {
    this.toursService.list('configurations/countries').subscribe(countriesWithCities => {
      this.countriesList = countriesWithCities;
      $(document).ready(function () {
        $('.collapsible').collapsible();
      });

    })
  }

}
