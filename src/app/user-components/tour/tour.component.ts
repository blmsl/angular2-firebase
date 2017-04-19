import { Component, OnInit } from '@angular/core';
declare let $:any;
@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss']
})
export class TourComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function(){
      $('.collapsible').collapsible();
      $('.carousel.carousel-slider').carousel({fullWidth: true});
    });
  }

}
