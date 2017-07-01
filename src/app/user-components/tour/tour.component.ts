import {AfterViewInit, Component, ElementRef, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ToursService} from '../../shared/services/tours.service';
import * as _ from 'lodash';
import {MzModalService, MzToastService} from 'ng2-materialize';
import {OrderModalComponent} from './order-modal/order-modal.component';
declare const $: any;
@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss']

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
              private modalService: MzModalService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.tourKey = params.key;
      this.toursService.getTourDetails(this.tourKey).subscribe((response) => {
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

  openServiceModal() {
    this.modalService.open(OrderModalComponent);
  }

  showToast() {
    this.toastService.show('Cпасибо большое за вашу заявку, мы в скором времени свяжемся с Вам ;)', 3000, 'green');
  }

  ngAfterViewInit() {
    const mapTimeOut = setTimeout(() => {
      this.alreadyLoaded = true;
      clearTimeout(mapTimeOut);
    }, 200);
  }


}
