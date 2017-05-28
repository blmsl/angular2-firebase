import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToursFiltersAndSortingComponent } from './tours-filters-and-sorting.component';

describe('ToursFiltersAndSortingComponent', () => {
  let component: ToursFiltersAndSortingComponent;
  let fixture: ComponentFixture<ToursFiltersAndSortingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToursFiltersAndSortingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToursFiltersAndSortingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
