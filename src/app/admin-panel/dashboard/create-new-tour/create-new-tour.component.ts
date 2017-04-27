import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToursService} from "../../../shared/services/tours.service";
import {Observable} from "rxjs/Observable";
import * as firebase from "firebase"
declare let $:any;

@Component({
  selector: 'app-create-new-tour',
  templateUrl: './create-new-tour.component.html',
  styleUrls: ['./create-new-tour.component.scss']
})
export class CreateNewTourComponent implements OnInit,AfterViewInit {
  createTourForm: FormGroup;
  mainPhotoFile;
  openAlertModal = false;
  newFileUrl;
  uploadTrigger = false;
  constructor(public fb:FormBuilder,
              public toursService:ToursService) { }

  ngOnInit() {
    this.createTourForm = this.fb.group({
      country:['',Validators.required],
      price:['',Validators.required],
      hotelName:['',Validators.required],
      detailDescription:['',Validators.required],
      mainPhotoUrl:['',Validators.required],
      // imageGalery:'',
      endDate:['',Validators.required],
      shortDescription: ['',Validators.required],
      stars:['',Validators.required],

    })
  }
  onMainPhotoUpload(Url) {
    this.newFileUrl = Url;
  }

  newFileObs() {
    return Observable.create((observer)=>{
      let timer = 0;
      let int = setInterval(()=>{
        timer = +timer;
        if(this.newFileUrl){
          observer.next(this.newFileUrl);
          observer.complete();
        }
        if(timer>=50){clearInterval(int)}
      },100)
    })
  }

  createTour() {
    this.toursService.tours().push(this.createTourForm.value).then((response)=>{
      this.uploadTrigger = true;
      this.newFileObs().subscribe((Url)=>{
        let objectPath = '/'+response.path.o.join('/');
        let updates = {};
        this.createTourForm.value.mainPhotoUrl = Url;

        updates[`${objectPath}/mainPhotoUrl`] = this.createTourForm.value.mainPhotoUrl;
        return firebase.database().ref().update(updates).then((responseUpdate)=>{
          this.uploadTrigger = false;
        });
      });

    })
    // if( this.createTourForm.status != "INVALID"){
    //   this.toursService.tours().push(this.createTourForm.value)
    // } else  this.openAlertModal = true;
    // console.log('this.createTourForm',this.createTourForm.status);

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
      weekdaysLetter: [ 'Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб' ],
//Today and clear
      today: 'Cегодня',
      clear: 'Очистить',
      close: 'Закрыть',
//The format to show on the `input` element
      format: 'dd/mm/yyyy'
    });
//Copy settings and initialization tooltipped
    $('select').material_select();
  }
}
