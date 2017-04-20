import { TestBed, inject } from '@angular/core/testing';

import { ToursService } from './tours.service';

describe('ToursService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToursService]
    });
  });

  it('should ...', inject([ToursService], (service: ToursService) => {
    expect(service).toBeTruthy();
  }));
});
