import { Component, OnInit } from '@angular/core';
import {ToursService} from "../../shared/services/tours.service";

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

  getToursList() {
    this.toursService.tours().subscribe((response)=>{
      this.toursList = response;
      console.log('this.toursList',this.toursList)
    })
  }

}
