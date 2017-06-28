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

  getToursList(filteringModel?: FilterInterface) {
    this.toursService.list('tours').subscribe((response) => {
      if (filteringModel) {
        const fiteringModelKeys = Object.keys(filteringModel);
        this.toursList = _.filter(response, (filteringItem) => {
          let compareResult;
          fiteringModelKeys.forEach((filterKey) => {
           // Removing empty filter fields
           if (!filteringModel[filterKey].length) {
             delete filteringModel[filterKey];
             fiteringModelKeys.splice(fiteringModelKeys.indexOf(filterKey), 1);
           }
          });
           // Filtering by each criteria
          fiteringModelKeys.forEach((filterKey) => {
            if (compareResult === -1) { return; }
            compareResult = filteringModel[filterKey].indexOf(filteringItem[filterKey]);
          });
          return compareResult !== -1;
        });
      } else {
        this.toursList = response;
      }
    });
  }

}
