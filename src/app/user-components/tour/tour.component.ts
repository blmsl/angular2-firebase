import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
declare let $:any;
@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class TourComponent implements OnInit,AfterViewInit {
  constructor() { }

  ngOnInit() {}

  ngAfterViewInit() {
    $('.materialboxed').materialbox();
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
  }



}
