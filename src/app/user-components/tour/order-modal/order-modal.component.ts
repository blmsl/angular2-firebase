import {Component, Input, OnChanges, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { MzBaseModal } from 'ng2-materialize';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OrderModalComponent extends MzBaseModal implements OnInit, OnChanges {
  orderFormModel;
  modalOptions;
  bottomSheetModal;
  constructor(public fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.initOrderModal();
    this.initOrderFormModel();
  }

  ngOnChanges() {}

  initOrderFormModel() {
    this.orderFormModel = this.fb.group({
      telephoneNumber: ['', Validators.required],
      customersName: ['', Validators.required]
    });
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
