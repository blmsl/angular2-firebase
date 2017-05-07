import {Component, OnInit} from '@angular/core';
import { initializeApp, database } from 'firebase'
import { Constants } from "./shared/core/constants"
declare let $:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  constructor() {

  }
  ngOnInit() {
  }


}
