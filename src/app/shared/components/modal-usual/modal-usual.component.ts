import {Component, OnInit, AfterViewInit, Input, OnChanges, SimpleChanges} from '@angular/core';
declare let $:any;

@Component({
  selector: 'app-modal-usual',
  templateUrl: './modal-usual.component.html',
  styleUrls: ['./modal-usual.component.scss']
})

export class ModalUsualComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() modalHeader:string;
  @Input() mainText:string;
  @Input() open:boolean;

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(changes:SimpleChanges) {
    console.log('this.open',this.open);
    if(changes['open']) this.openModal();
    else this.closeModal();
  }

  openModal() {
    $('#usualModal').modal('open');
  }

  closeModal() {
    $('#usualModal').modal('close');
  }

  ngAfterViewInit() {
    $(document).ready(function(){
      $('.modal').modal({
          dismissible: true, // Modal can be dismissed by clicking outside of the modal
          opacity: .5, // Opacity of modal background
          inDuration: 300, // Transition in duration
          outDuration: 200, // Transition out duration
          startingTop: '4%', // Starting top style attribute
          endingTop: '10%', // Ending top style attribute
          ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
            console.log(modal, trigger);
          },
          complete: function() { console.log('closed'); } // Callback for Modal close
        }
      );
    });
  }

}
