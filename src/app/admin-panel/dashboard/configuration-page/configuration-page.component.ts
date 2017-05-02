import {AfterViewInit, Component, OnInit} from '@angular/core';
declare let $:any;
@Component({
  selector: 'app-configuration-page',
  templateUrl: './configuration-page.component.html',
  styleUrls: ['./configuration-page.component.scss']
})
export class ConfigurationPageComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
   $(document).ready(function(){
      $('.collapsible').collapsible();
   });
  }

}
