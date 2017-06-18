import { Component, OnInit } from '@angular/core';
import {ToursService} from '../../shared/services/tours.service';
import * as _ from 'lodash';
import {Observable} from 'rxjs/Observable';

export interface FilterInterface {
  countries: any[];
  supply: any[];
  stars?: any[];
}
@Component({
  selector: 'app-tour-listing',
  templateUrl: './tour-listing.component.html',
  styleUrls: ['./tour-listing.component.scss']
})
export class TourListingComponent implements OnInit {
  toursList;
  filteredData = [];

  constructor(public toursService: ToursService) { }

  ngOnInit() {
    this.getToursList();
  }
    // TODO:need filter refactoring (so tricky logic)
  getToursList(filteringModel?: FilterInterface) {
    this.toursService.list('tours').subscribe((response) => {
      this.filteredData = [];
      if (filteringModel) {
        const filterObs = Observable.create((observer) => {
          // filter criteria with highest priority
          let filteredByCountry = [];
          filteringModel.countries.forEach((country) => {
            filteredByCountry = filteredByCountry.concat( _.filter(response, {country: country}));
          });
          if (!filteringModel.countries.length) { filteredByCountry = response; }
          observer.next(filteredByCountry);
          observer.complete();
        }).subscribe((filteredByCountryObs) => {
          console.log('filteredByCountryObs', filteredByCountryObs);
          const fiteringModelKeys = Object.keys(filteringModel);
          // filter criteria with middle priority
          fiteringModelKeys.forEach((filterKey) => {
            let filteredToursListBySeparateCriteria = [];
            filteringModel[filterKey].forEach((filteringCriteriaItem) => {
              if (filterKey === 'countries') { return; }
              filteredToursListBySeparateCriteria = _.filter(filteredByCountryObs, { [filterKey]: filteringCriteriaItem });
            });
            this.filteredData = this.filteredData.concat(filteredToursListBySeparateCriteria);
          });

          if (!filteringModel.supply.length && !filteringModel.stars.length) {
            this.filteredData = this.filteredData.concat(filteredByCountryObs);
          }
          this.toursList = this.filterDuplicatesToursList(this.filteredData, 'id');
        });
        return;
      }
      this.toursList = response;
    });
  }

  filterDuplicatesToursList(arr, prop) {
      const new_arr = [];
      const lookup  = {};

      for (var i in arr) {
        lookup[arr[i][prop]] = arr[i];
      }
      for (i in lookup) {
        new_arr.push(lookup[i]);
      }

      return new_arr;
  }

}
