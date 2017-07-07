import { Injectable } from '@angular/core';

@Injectable()
export class HelpersService {

  constructor() { }

  filterDuplicatesToursList(arr, prop) {
    const new_arr = [];
    const lookup  = {};

    for (var i in arr) {
      lookup[arr[i][prop]] = arr[i];
    }
    for (i in lookup) {
      new_arr.push(lookup[i]);
    }

    return new_arr;
  }

  checkFieldOnDefining(model) {
    let foundEmptyField = false;
    if (model) {
      Object.keys(model).forEach((key) => {
        if (!foundEmptyField) {
          foundEmptyField = model[key] === ('undefined' || null || '' || NaN || 0);
        } else { return; }
      });
    } else { console.log('Model is Undefined!'); }
    return foundEmptyField;
  }

}
