import {AfterViewInit, Component, OnInit} from '@angular/core';
import { initializeApp, database } from 'firebase'
import { ProcessHandlerService } from "./shared/services/process-handler.service"

declare let $:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'app works!';

  constructor(public processHandlerService:ProcessHandlerService) {
  }
  ngOnInit() {
  }
  ngAfterViewInit() {
  }


}
