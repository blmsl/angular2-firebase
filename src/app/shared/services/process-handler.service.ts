import { Injectable } from '@angular/core';

@Injectable()
export class ProcessHandlerService {
  active;
  constructor() { }

  start() {
    this.active = true;
  }

  done() {
    this.active = false;
  }

}
