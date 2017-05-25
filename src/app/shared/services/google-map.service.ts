import { Injectable } from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class GoogleMapService {

  constructor(public http:Http) { }

  initGoogleMap() {
    return this.http.get(`https://maps.googleapis.com/maps/api/js?key=AIzaSyBBAyXmBpXXb8axCYVCd_h1_rB2tpCmGgU`)
  }
}
