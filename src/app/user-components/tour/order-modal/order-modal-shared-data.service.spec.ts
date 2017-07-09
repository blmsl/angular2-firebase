import { TestBed, inject } from '@angular/core/testing';

import { OrderModalSharedDataService } from './order-modal-shared-data.service';

describe('OrderModalSharedDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderModalSharedDataService]
    });
  });

  it('should ...', inject([OrderModalSharedDataService], (service: OrderModalSharedDataService) => {
    expect(service).toBeTruthy();
  }));
});
