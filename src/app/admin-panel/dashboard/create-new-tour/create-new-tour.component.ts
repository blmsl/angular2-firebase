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
      selectMonths: true,//Creates a dropdown to control month
      selectYears: 15,//Creates a dropdown of 15 years to control year
//The title label to use for the month nav buttons
      labelMonthNext: 'Следующий месяц',
      labelMonthPrev: 'Предыдущий месяц',
//The title label to use for the dropdown selectors
      labelMonthSelect: 'Выберите месяц',
      labelYearSelect: 'Выберите год',
//Months and weekdays
      monthsFull: [ 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь' ],
      monthsShort: [ 'Янв', 'Фев', 'Мар', 'Apr', 'Mar', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
      weekdaysFull: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
      weekdaysShort: [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
//Materialize modified
      weekdaysLetter: [ 'S', 'M', 'T', 'W', 'T', 'F', 'S' ],
//Today and clear
      today: 'Today',
      clear: 'Clear',
      close: 'Close',
//The format to show on the `input` element
      format: 'dd/mm/yyyy'
    });
//Copy settings and initialization tooltipped

  }
}
