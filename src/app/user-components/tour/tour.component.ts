import {AfterViewInit, Component, ElementRef, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ToursService} from '../../shared/services/tours.service';
import * as _ from 'lodash';
import {MzModalService, MzToastService} from 'ng2-materialize';
import {OrderModalComponent} from './order-modal/order-modal.component';
import {OrderModalSharedDataService} from "./order-modal/order-modal-shared-data.service";
declare const $: any;
import * as firebase from 'firebase/app';
import {ProcessHandlerService} from "../../shared/services/process-handler.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TourComponent implements OnInit, AfterViewInit {
  tourKey;
  tourModel;
  alreadyLoaded;
  modalOptions;
  _ = _;

  constructor(public activatedRoute: ActivatedRoute,
              public toursService: ToursService,
              private el: ElementRef,
              private toastService: MzToastService,
              private modalService: MzModalService,
              private orderModalSharedDataService: OrderModalSharedDataService,
              private processHandlerService: ProcessHandlerService,
              public domSanitize: DomSanitizer) { }

  ngOnInit() {
    this.processHandlerService.start();
    // this.toursService.getObjectByKeyValue('orders/anonymous', 'telephoneNumber', 3333).subscribe((response) => {
    //   console.log('response', response);
    // });

    this.activatedRoute.params.subscribe(params => {
      this.tourKey = params.key;
      this.toursService.getTourDetails(this.tourKey).subscribe((response) => {
        response.video = this.domSanitize.bypassSecurityTrustResourceUrl(response.video);
        this.tourModel = response;
        this.initImageGallery();
        $('.materialboxed').materialbox();
      });
    });
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

  finishedLoadingImg() {
    const timeOut = setTimeout(() => {
      this.processHandlerService.done();
      clearTimeout(timeOut);
    }, 500);
  }

  openServiceModal(tourId, tourName) {
    this.orderModalSharedDataService.data.tourId = tourId;
    this.orderModalSharedDataService.data.tourName = tourName;
    this.modalService.open(OrderModalComponent);
  }

  ngAfterViewInit() {
    const mapTimeOut = setTimeout(() => {
      this.alreadyLoaded = true;
      clearTimeout(mapTimeOut);
    }, 200);
  }


}
