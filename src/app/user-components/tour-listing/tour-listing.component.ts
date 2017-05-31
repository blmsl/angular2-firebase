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
  filteredData=[];

  constructor(public toursService: ToursService) { }

  ngOnInit() {
    this.getToursList();
  }
    // TODO:need filter refactoring (so tricky logic)
  getToursList(filteringModel?: FilterInterface) {
    this.toursService.list('tours').subscribe((response) => {
      this.filteredData = [];
      if (filteringModel) {
        console.log('filteringModel', filteringModel);
        console.log('reponse', response);
        const filterObs = Observable.create((observer) => {
          // filter criteria with highest priority
          let filteredByCountry = [];
          filteringModel.countries.forEach((country) => {
            filteredByCountry = filteredByCountry.concat( _.filter(response, {country: country}));
          });
          observer.next(filteredByCountry);
          observer.complete();
        }).subscribe((filteredByCountryObs) => {
          // filter criteria with middle priority
          filteringModel.supply.forEach((supply) => {
            const listWhichShouldToFilter = filteringModel.countries.length ? filteredByCountryObs : response;
            const filteredByCriteriaList = _.filter(listWhichShouldToFilter, (tour) => {
              return tour.supply.label === supply;
            });
            this.filteredData = this.filteredData.concat(filteredByCriteriaList);
          });
          // filter criteria with lowest priority, last filtering criteria has a appropriate filtering specific
          filteringModel.stars.forEach((stars) => {
            let listWhichShouldToFilter = null;
            if (filteringModel.countries.length && !filteringModel.supply.length ) {
              listWhichShouldToFilter = filteredByCountryObs;
            }
            if (filteringModel.supply.length) {
              listWhichShouldToFilter = this.filteredData;
            }
            if (!filteringModel.countries.length && !filteringModel.supply.length) {
              listWhichShouldToFilter = response;
            }
            this.filteredData = _.filter(listWhichShouldToFilter, (item) => {
              return item.stars.length === stars;
            });
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
