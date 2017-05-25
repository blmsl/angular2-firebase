import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleMapApiComponent } from './google-map-api.component';

describe('GoogleMapApiComponent', () => {
  let component: GoogleMapApiComponent;
  let fixture: ComponentFixture<GoogleMapApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleMapApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleMapApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
