import {Component, Input, OnInit} from '@angular/core';
import {ProcessHandlerService} from "../../../shared/services/process-handler.service";
import { Observable } from "rxjs/Observable"


@Component({
  selector: 'app-tour-item',
  templateUrl: './tour-item.component.html',
  styleUrls: ['./tour-item.component.scss']
})
export class TourItemComponent implements OnInit {
  @Input() tour;
  constructor(public processHandlerService:ProcessHandlerService) { }

  ngOnInit() {
    this.processHandlerService.start();
    this.tourObs().subscribe(()=>{
      this.processHandlerService.done();
    })
  }

  tourObs() {
    return Observable.create((observer)=>{
      let timer = 0;
      let int = setInterval(()=>{
        timer = +timer;
        if(this.tour){
          clearInterval(int);
          observer.next(this.tour);
          observer.complete();
        }
        if(timer>=50){clearInterval(int)}
      },100)
    })
  }

}
