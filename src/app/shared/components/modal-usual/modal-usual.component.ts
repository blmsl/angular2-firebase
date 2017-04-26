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
    $('#usualModal').modal('open');
    this.activeRoute.queryParams.subscribe((params)=>{
      console.log("params", params);
      this.pramsTransition  = params['transition'];
      this.modalAction(this.pramsTransition);
    });
  }

  modalAction(transition){
    if(transition)$('#usualModal').modal('open');
    else $('#usualModal').modal('close');
  }

  ngOnChanges(changes:SimpleChanges) {
    this.modalAction(this.pramsTransition);
  }

  closeModal() {
    $('#usualModal').modal('close');
    this.router.navigate([{ outlets: { popUps: null }}]);
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
          complete: function() {
            $('#usualModal').modal('close');
            // this.routerOutlet.deactivate();
          } // Callback for Modal close
        });
      $('#usualModal').modal('open');
    });
  }

  ngOnDestroy() {
    console.log('destroy')
  }

}
