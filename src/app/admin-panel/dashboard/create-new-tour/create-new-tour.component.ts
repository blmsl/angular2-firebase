import {AfterViewInit, Component, OnInit} from '@angular/core';
declare let $:any;
@Component({
  selector: 'app-create-new-tour',
  templateUrl: './create-new-tour.component.html',
  styleUrls: ['./create-new-tour.component.scss']
})
export class CreateNewTourComponent implements OnInit,AfterViewInit {

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15 // Creates a dropdown of 15 years to control year
    });
  }
}
