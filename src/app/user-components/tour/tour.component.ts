import {AfterViewInit, Component, ElementRef, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ToursService} from "../../shared/services/tours.service";
declare let $:any;
@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class TourComponent implements OnInit,AfterViewInit {
  tourKey;
  tourModel;

  constructor(public activatedRoute:ActivatedRoute,
              public toursService:ToursService,
              private el: ElementRef) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params=>{
      this.tourKey = params.key;
      this.toursService.getTourDetails(this.tourKey).subscribe((response)=>{
        this.tourModel = response;
        this.initImageGallery();
        console.log("tourModel",this.tourModel);
      })
    })
  }



  initImageGallery() {
    $(document).ready(function() {
      $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.slider-nav'
      });

      $('.slider-nav').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        centerMode: true,
        focusOnSelect: true
      });
    });
  }

  ngAfterViewInit() {
    $('.materialboxed').materialbox();

  }


}
