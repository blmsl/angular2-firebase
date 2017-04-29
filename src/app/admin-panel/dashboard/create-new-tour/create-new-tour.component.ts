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
  tourId;
  starsSelect;
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

  changeFormatValueSelectStars(starsQuantity) {
    this.createTourForm.value.start = [];
    for(let i = 1; starsQuantity>=i;i++){
      this.createTourForm.value.stars.push(i)
    }
  }

  newFileObs() {
    return Observable.create((observer)=>{
      let timer = 0;
      let int = setInterval(()=>{
        timer = +timer;
        if(this.newFileUrl){
          clearInterval(int);
          observer.next(this.newFileUrl);
          observer.complete();
        }
        if(timer>=50){clearInterval(int)}
      },100)
    })
  }

  createTour() {
    let starsSelectValue = $('.starsSelect').find('.select-dropdown').val();
    this.changeFormatValueSelectStars(starsSelectValue);
    this.toursService.tours().push(this.createTourForm.value).then((response)=>{
      this.tourId = response.path.o[response.path.o.length-1];
      this.newFileObs().subscribe((Url)=>{


        this.tourId = null;
        let objectPath = '/'+response.path.o.join('/');
        let updates = {};
        console.log("Url",Url);
        this.createTourForm.value.mainPhotoUrl = Url;

        updates[`${objectPath}/mainPhotoUrl`] = this.createTourForm.value.mainPhotoUrl;
        console.log("Url",Url);
        console.log("updates",updates);
        firebase.database().ref().update(updates);
      });

    })

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
      monthsShort: [ 'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек' ],
      weekdaysFull: [ 'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота' ],
      weekdaysShort: [ 'Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб' ],
//Materialize modified
      weekdaysLetter: [ 'В', 'П', 'В', 'С', 'Ч', 'П', 'С' ],
//Today and clear
      today: false,
      clear: false,
      close: 'Закрыть',
//The format to show on the `input` element
      format: 'dd/mm/yyyy'
    });
//Copy settings and initialization tooltipped
    $('select').material_select();
  }
}
