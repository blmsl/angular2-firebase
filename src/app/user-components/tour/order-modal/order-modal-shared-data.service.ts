import { Injectable } from '@angular/core';

@Injectable()
export class OrderModalSharedDataService {
  data = {
    tourId: null,
    tourName: null
  };
  constructor() { }

}
