import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-google-map-iframe',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit,OnChanges {
  googleMapApiUrl;
  hideOverlay;
  @Input() tourLocation;

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit() {
  }
  ngOnChanges() {
    if(this.tourLocation) this.initMapUrl();
  }

  initMapUrl() {
    let url = `https://www.google.com/maps/embed/v1/search?key=AIzaSyBBAyXmBpXXb8axCYVCd_h1_rB2tpCmGgU&q=${this.tourLocation.latitude},${this.tourLocation.longitude}`;
    this.googleMapApiUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
