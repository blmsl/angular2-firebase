import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import * as _ from 'lodash';
import {ToursService} from '../../../shared/services/tours.service';
@Component({
  selector: 'app-tours-filters-and-sorting',
  templateUrl: './tours-filters-and-sorting.component.html',
  styleUrls: ['./tours-filters-and-sorting.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ToursFiltersAndSortingComponent implements OnInit {
  @Output() applyFilterModel = new EventEmitter;
  public countriesListForFiltering;
  public filteringModel;
  public supplyList;
  public starsCheckboxList;
  constructor(private toursService: ToursService) { }

  ngOnInit() {
    this.getCountriesList();
    this.initFilteringModel();
    this.initStartCheckBoxModel();
    this.getSupplyList();
  }

  initFilteringModel() {
    this.filteringModel = {
      country: [],
      supply: [],
      stars: []
    };
  }
  initStartCheckBoxModel() {
    this.starsCheckboxList = [
      {label: 1,
        quantity: _.range(0, 1),
      },
      {label: 2,
        quantity: _.range(0, 2),
      },
      {label: 3,
        quantity: _.range(0, 3),
      },
      {label: 4,
        quantity: _.range(0, 4),
      },
      {label: 5,
        quantity: _.range(0, 5),
      },
    ];
  }

  getCountriesList() {
    this.toursService.list('configurations/countries').subscribe((response) => {
      this.countriesListForFiltering = response;
    });
  }

  getSupplyList() {
    this.toursService.list('configurations/supply').subscribe((response) => {
      this.supplyList = response;
      console.log('response', response);
      setTimeout(() => {
        $('.tooltipped').tooltip({delay: 50});
      }, 300);
    });
  }

  onSelectCountry(value: string, checked: boolean) {
    this.filteringModel.country = [];
    _.find(this.countriesListForFiltering, {country: value}).checked = checked;
    _.filter(this.countriesListForFiltering, {checked: true}).forEach((country) => {
      this.filteringModel.country.push(country.country);
    });
    this.applyFilterModel.emit(this.filteringModel);
  }

  onSelectSupply(value: string, checked: boolean) {
    this.filteringModel.supply = [];
    _.find(this.supplyList, {label: value}).checked = checked;
    _.filter(this.supplyList, {checked: true}).forEach((supply) => {
      this.filteringModel.supply.push(supply.label);
    });
    this.applyFilterModel.emit(this.filteringModel);
  }

  onSelectStars(value: string, checked: boolean) {
    const valeTrans = parseInt(value, 10);
    this.filteringModel.stars = [];
    _.find(this.starsCheckboxList, {label: valeTrans}).checked = checked;
    _.filter(this.starsCheckboxList, {checked: true}).forEach((stars) => {
      this.filteringModel.stars.push(stars.label);
    });
    this.applyFilterModel.emit(this.filteringModel);
  }

}
