import {Component, ElementRef, EventEmitter, NgZone, OnInit, Output, Input, ViewChild, OnChanges} from '@angular/core';
import { FormControl } from "@angular/forms";
import { MapsAPILoader, GoogleMapsAPIWrapper } from 'angular2-google-maps/core';
import { } from '@types/googlemaps';

declare var google:any;

@Component({
  selector: 'app-google-map-autocomplete',
  templateUrl: './google-map-autocomplete.component.html',
  styleUrls: ['./google-map-autocomplete.component.scss']
})

export class GoogleMapAutocompleteComponent implements OnInit,OnChanges {
  @Output() emitLocation? = new EventEmitter;
  @Input() readOnly?;
  @Input() tourLocation?;

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  ngOnChanges() {
    if(this.tourLocation) {
      this.latitude = Number(this.tourLocation.latitude);
      this.longitude = Number(this.tourLocation.longitude);
      this.zoom = 7;
    }
  }
  ngOnInit() {
    this.searchControl = new FormControl();
    if(this.readOnly) return;
    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 7;

          let dataForSave = {
            latitude:this.latitude,
            longitude:this.longitude,
            addressName: this.searchElementRef.nativeElement.value
          };

          this.emitLocation.emit(dataForSave);
        });
      });
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
}
