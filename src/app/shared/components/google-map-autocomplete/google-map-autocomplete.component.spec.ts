import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleMapAutocompleteComponent } from './google-map-autocomplete.component';

describe('GoogleMapAutocompleteComponent', () => {
  let component: GoogleMapAutocompleteComponent;
  let fixture: ComponentFixture<GoogleMapAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleMapAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleMapAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
