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

  constructor(public toursService:ToursService) { }

  ngOnInit() {
    this.getToursList()
  }

  getToursList(filteringModel?:filterInterface) {
    this.toursService.list('tours').subscribe((response)=>{
      if(filteringModel) {

        let filterObs = Observable.create((observer)=>{
          let filteredData=[];
          // filter criteria with highest priority
          filteringModel.countries.forEach((country)=>{
            let filteredByCountry=[];
            let filteredByCriteriaList = _.filter(response,{country:country});
            console.log('filteredByCriteriaList',filteredByCriteriaList);
            filteredByCountry = filteredByCountry.concat(filteredByCriteriaList);
            filteredData = filteredData.concat(filteredByCountry);
          });
          observer.next(filteredData);
          observer.complete();
        }).subscribe((filteredData)=>{
          // filter criteria with middle priority
          filteringModel.supply.forEach((supply)=>{
            let listWhichShouldToFilter = filteringModel.countries.length ? filteredData : response;
            let filteredByCriteriaList = _.filter(listWhichShouldToFilter,{supply:supply});
            filteredData = filteredData.concat(filteredByCriteriaList);
            this.toursList = this.filterDuplicatesToursList(filteredData,'id');
          });
        });

        return;
      }
      this.toursList = response;
      console.log('this.toursList',this.toursList);
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
