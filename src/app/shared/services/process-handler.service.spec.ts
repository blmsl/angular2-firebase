import { TestBed, inject } from '@angular/core/testing';

import { ProcessHandlerService } from './process-handler.service';

describe('ProcessHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcessHandlerService]
    });
  });

  it('should ...', inject([ProcessHandlerService], (service: ProcessHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
