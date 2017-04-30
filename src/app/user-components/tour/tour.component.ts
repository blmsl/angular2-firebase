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

  }



}
