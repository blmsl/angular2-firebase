import {
  Component, OnInit, AfterViewInit, Input, OnChanges, SimpleChanges, Output, EventEmitter,
  OnDestroy
} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
declare let $:any;

@Component({
  selector: 'app-modal-usual',
  templateUrl: './modal-usual.component.html',
  styleUrls: ['./modal-usual.component.scss']
})

export class ModalUsualComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() modalHeader:string;
  @Input() mainText:string;
  @Input() open:boolean;
  @Output() close = new EventEmitter();

  pramsTransition;

  constructor(public router:Router,
  public activeRoute:ActivatedRoute) { }



  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params)=>{
      this.pramsTransition  = params['transition'];
    });
  }

  ngOnChanges(changes:SimpleChanges) {
    if(this.open)$('#usualModal').modal('open');
  }

  ngAfterViewInit() {
    let self = this
    $(document).ready(function(){
      $('.modal').modal({
          dismissible: true, // Modal can be dismissed by clicking outside of the modal
          opacity: .5, // Opacity of modal background
          inDuration: 300, // Transition in duration
          outDuration: 200, // Transition out duration
          startingTop: '4%', // Starting top style attribute
          endingTop: '10%', // Ending top style attribute
          ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.

          },
          complete: function() {
            self.close.emit('close');
          } // Callback for Modal close
        });
    });
  }

  ngOnDestroy() {

  }

}
