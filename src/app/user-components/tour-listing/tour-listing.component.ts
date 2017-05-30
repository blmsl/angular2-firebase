import { Component, OnInit } from '@angular/core';
import {ToursService} from "../../shared/services/tours.service";
import * as _ from "lodash";
import {Observable} from "rxjs/Observable";
export interface filterInterface {
  countries:any[],
  supply:any[],
  stars?:any[]
}
@Component({
  selector: 'app-tour-listing',
  templateUrl: './tour-listing.component.html',
  styleUrls: ['./tour-listing.component.scss']
})
export class TourListingComponent implements OnInit {
  toursList;
  filteredData=[];

  constructor(public toursService:ToursService) { }

  ngOnInit() {
    this.getToursList()
  }

  getToursList(filteringModel?:filterInterface) {
    this.toursService.list('tours').subscribe((response)=>{
      this.filteredData = [];
      if(filteringModel) {
        let filterObs = Observable.create((observer)=>{
          // filter criteria with highest priority
          let filteredByCountry = [];
          filteringModel.countries.forEach((country)=>{
            filteredByCountry = _.filter(response,{country:country});
          });
          observer.next(filteredByCountry);
          observer.complete();
        }).subscribe((filteredByCountryObs)=>{
          // filter criteria with middle priority
          filteringModel.supply.forEach((supply) => {
            let listWhichShouldToFilter = filteringModel.countries.length ? filteredByCountryObs : response;
            let filteredByCriteriaList = _.filter(listWhichShouldToFilter,{supply:supply});
            this.filteredData = this.filteredData.concat(filteredByCriteriaList);
          });
          if(!filteringModel.supply.length) {
            this.filteredData = this.filteredData.concat(filteredByCountryObs);
          }
          this.toursList = this.filterDuplicatesToursList(this.filteredData,'id');
        });
        return;
      }
      this.toursList = response;
    })
  }

  filterDuplicatesToursList(arr, prop) {
      let new_arr = [];
      let lookup  = {};

      for (var i in arr) {
        lookup[arr[i][prop]] = arr[i];
      }
      for (i in lookup) {
        new_arr.push(lookup[i]);
      }

      return new_arr;
  }

}
