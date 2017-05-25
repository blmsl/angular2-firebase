import {AfterViewInit, Component, OnInit} from '@angular/core';
import {GoogleMapService} from "../../services/google-map.service";
declare let google:any;
@Component({
  selector: 'app-google-map-api',
  templateUrl: './google-map-api.component.html',
  styleUrls: ['./google-map-api.component.scss']
})
export class GoogleMapApiComponent implements OnInit,AfterViewInit {

  constructor(public googleMapService: GoogleMapService) {
  }

  ngOnInit() {
    // this.initMap();
  }

  ngAfterViewInit() {
    let map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      scrollwheel: false,
      zoom: 8
    });
  }


  initMap() {
    // this.googleMapService.initGoogleMap().subscribe((response) => {
    //   let map = new google.maps.Map(document.getElementById('map'), {
    //     center: {lat: -34.397, lng: 150.644},
    //     scrollwheel: false,
    //     zoom: 8
    //   });
    // })
  }

}
