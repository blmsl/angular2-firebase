import {Component, Input, OnChanges, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MzBaseModal, MzToastService} from 'ng2-materialize';
import {ToursService} from '../../../shared/services/tours.service';
import {ActivatedRoute} from '@angular/router';
import {OrderModalSharedDataService} from './order-modal-shared-data.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OrderModalComponent extends MzBaseModal implements OnInit, OnChanges {
  orderFormModel;
  modalOptions;
  tourId;
  tourName;
  orderSubmitModel;
  cd = new Date(); // Current date;


  constructor(public fb: FormBuilder,
              private toursService: ToursService,
              private activatedRout: ActivatedRoute,
              private orderModalSharedDataService: OrderModalSharedDataService,
              private toastService: MzToastService
  ) {
    super();
  }

  ngOnInit() {
    this.initOrderModal();
    this.initOrderFormModel();
    this.initInputData();
    console.log('this.tourId', this.tourId);
  }

  customValidateTelephoneNumber() {
    return ((this.orderFormModel.controls.telephoneNumber.value + '').length > 6) && this.orderFormModel.controls.telephoneNumber.valid;
  }

  ngOnChanges() {}

  initInputData() {
    this.tourId = this.orderModalSharedDataService.data.tourId;
    this.tourName = this.orderModalSharedDataService.data.tourName;
  }

  initOrderFormModel() {
    this.orderFormModel = this.fb.group({
      telephoneNumber: ['', Validators.required],
      customersName: ['', Validators.required],
      orderBody: ['', Validators.required]
    });
  }

  intiOrderSubmitModel() {
    this.orderSubmitModel = _.cloneDeep(this.orderFormModel.value);
    this.orderSubmitModel.tourId = this.tourId;
    this.orderSubmitModel.tourName = this.tourName;
    this.orderSubmitModel.creationDate = `${new Date(this.cd.getFullYear(), this.cd.getMonth(), this.cd.getDate())}`;
    this.orderSubmitModel.orderId = Math.floor(Math.random() * 100000000);
  }

  submit() {
    this.intiOrderSubmitModel();
    if (this.orderFormModel.valid) {
      this.showToast();
      console.log('this.orderSubmitModel', this.orderSubmitModel);
      this.toursService.list('orders/anonymous').push(this.orderSubmitModel);
    } else {
      console.log('validation error');
    }
  }

  showToast() {
    this.toastService.show('Cпасибо большое за вашу заявку, мы в скором времени свяжемся с Вами ;)', 5000, 'green');
  }

  initOrderModal() {
    this.modalOptions = {
      dismissible: false, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      inDuration: 300, // Transition in duration
      outDuration: 200, // Transition out duration
      startingTop: '100%', // Starting top style attribute
      endingTop: '1%', // Ending top style attribute
      ready: (modal, trigger) => { // Callback for Modal open. Modal and trigger parameters available.
        console.log(modal, trigger);
      },
      complete: () => {
      } // Callback for Modal close
    };
  }

}
