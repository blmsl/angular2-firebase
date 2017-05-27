import {AfterViewInit, Component, OnChanges, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToursService } from "../../../shared/services/tours.service";
import { ProcessHandlerService } from "../../../shared/services/process-handler.service"
import { Observable } from "rxjs/Observable"
import * as _ from "lodash"
import * as firebase from "firebase"
declare let $:any;

@Component({
  selector: 'app-create-new-tour',
  templateUrl: './create-new-tour.component.html',
  styleUrls: ['./create-new-tour.component.scss']
})
export class CreateNewTourComponent implements OnInit,AfterViewInit {
  createTourForm: FormGroup;
  createTourModel;
  openAlertModal:boolean = false;
  newFileUrl:string;
  newImagelistUrl = [];
  tourId:string;
  countriesListForDropDown:any[];
  servicesListForView:any[];
  departureCitiesListForDropDown:any[];
  supplyListForDropDown:any[];
  updatesModel = {};
  newTourPath:string;
  hotelLocation;

  constructor(public fb:FormBuilder,
              public toursService:ToursService,
              public processHandlerService:ProcessHandlerService) { }

  ngOnInit() {
    this.createTourForm = this.fb.group({
      country:['',Validators.required],
      city:['',Validators.required],
      price:['',Validators.required],
      hotelName:['',Validators.required],
      detailDescription:['',Validators.required],
      mainPhotoUrl:'',
      fullImageGalery:'',
      endDate:['',Validators.required],
      shortDescription: ['',Validators.required],
      stars:['',Validators.required],
      serviceList:['',Validators.required],
      nights:['',Validators.required],
      days:['',Validators.required],
      departure:['',Validators.required],
      supply:['',Validators.required]
    });
    this.getCountriesList();
    this.getServicesList();
    this.getDepartureCitiesListForDropDown();
    this.getSupplyListForDropDown();
  }

  onMainPhotoUpload(Url) {
    this.newFileUrl = Url;
  }

  initCreateTourModel() {
    this.createTourModel = _.cloneDeep(this.createTourForm.value);
    this.createTourModel.hotelLocation = this.hotelLocation;
    this.createTourModel.creationDate = new Date().toISOString();
    this.createTourModel.currency = 'USD';
  }

  getDepartureCitiesListForDropDown() {
    this.toursService.list('configurations/departure').subscribe((response)=>{
      this.departureCitiesListForDropDown = response;
    });
  }

  getSupplyListForDropDown() {
    this.toursService.list('configurations/supply').subscribe((response)=>{
      console.log('supply',response);
      this.supplyListForDropDown = response;
    })
  }

  onFullPhotosUpload(UrlList:any[]) {
    this.newImagelistUrl = UrlList;
  }

  changeFormatValueSelectStars(starsQuantity) {
    this.createTourForm.value.stars = [];
    for(let i = 1; starsQuantity>=i;i++){
      this.createTourForm.value.stars.push(i)
    }
  }

  onSelectHotelLocation(location) {
    this.hotelLocation = location;
    console.log('this.createTourForm',this.createTourForm);
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

  newFilesListObs() {
    return Observable.create((observer)=>{
      let timer = 0;
      let int = setInterval(()=>{
        timer = +timer;
        if(this.newImagelistUrl.length){
          clearInterval(int);
          observer.next(this.newImagelistUrl);
          observer.complete();
        }
        if(timer>=50){clearInterval(int)}
      },100)
    })
  }

  getSelectsValue() {
    let starsSelectValue = $('.starsSelect').find('.select-dropdown').val();
    this.changeFormatValueSelectStars(starsSelectValue);
  }

  getServicesList() {
    this.toursService.list('configurations/hotelServices').subscribe(servicesList => {
      this.servicesListForView = servicesList;
      this.servicesListForView.forEach((service)=>{
        service.checked = false;
      })
    })
  }

  onSelectCountry(countryName) {
    this.createTourForm.value.country = countryName;
  }

  onSelectCity(cityName) {
    this.createTourForm.value.city = cityName;
  }

  onSelectHotelService(value:string,checked:boolean) {
    this.createTourForm.value.serviceList = [];
    _.find(this.servicesListForView,{title:value}).checked = checked;
    _.filter(this.servicesListForView,{checked: true}).forEach((service)=>{
      this.createTourForm.value.serviceList.push(service.title);
    });
  }

  onSelectDeparture(departureCity) {
    this.createTourForm.value.departure = departureCity;
  }

  onSelectSupply(supply) {
    this.createTourForm.value.supply = supply;
  }

  createTour() {
    this.processHandlerService.start();
      this.getSelectsValue();
      console.log('this.createTourModel',this.createTourModel);
      this.initCreateTourModel();
      this.toursService.list('tours').push(this.createTourModel).then((response)=>{
        this.tourId = response.path.o[response.path.o.length-1];
        this.newTourPath = '/'+response.path.o.join('/');
        Observable.zip(
          this.newFileObs(),
          this.newFilesListObs()
        ).subscribe((response)=>{
          this.updatesModel[`${this.newTourPath}/mainPhotoUrl`] =response[0];
          this.updatesModel[`${this.newTourPath}/fullImageGalery`] = response[1];
          setTimeout(()=>{
            this.updateData(this.updatesModel).then(()=>this.processHandlerService.done())
          },500);
        })
      })
    }

  updateData(updatesModel) {
    console.log("this.updatesModel",updatesModel);
    return firebase.database().ref().update(updatesModel)
  }

  getCountriesList() {
    this.toursService.list('configurations/countries').subscribe((response)=>{
      console.log('countries reposne',response);
      this.countriesListForDropDown = response;
      setTimeout(()=>{
        $('select').material_select();
        },200)
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
  }
}
