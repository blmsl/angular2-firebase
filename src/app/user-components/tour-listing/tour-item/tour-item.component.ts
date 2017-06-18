import { Component, Input, OnInit } from '@angular/core';
import { ProcessHandlerService } from '../../../shared/services/process-handler.service';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';


@Component({
  selector: 'app-tour-item',
  templateUrl: './tour-item.component.html',
  styleUrls: ['./tour-item.component.scss']
})
export class TourItemComponent implements OnInit {
  @Input() tour;
  _ = _;
  constructor(public processHandlerService: ProcessHandlerService) { }

  ngOnInit() {
    this.processHandlerService.start();
    this.tourObs().subscribe(() => {
      console.log('this.tour', this.tour);
      this.processHandlerService.done();
    });
  }

  tourObs() {
    return Observable.create((observer) => {
      let timer = 0;
      const int = setInterval(() => {
        timer = +timer;
        if (this.tour) {
          clearInterval(int);
          observer.next(this.tour);
          observer.complete();
        }
        if (timer >= 50) { clearInterval(int); }
      }, 100);
    });
  }

}
