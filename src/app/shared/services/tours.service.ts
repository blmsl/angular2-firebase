import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import * as firebase from 'firebase/app';
import {toPromise} from "rxjs/operator/toPromise";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ToursService {

  constructor(public afDatabase: AngularFireDatabase) { }
  // AngularFire2 methods
  list(value, query?) {
    return this.afDatabase.list(value) ;
  }

  Object(path) {
    return this.afDatabase.object(path);
  }

  getTourDetails(key: string) {
    return this.afDatabase.object(`tours/${key}`);
  }

  // Native firebase methods
  updateData(path, updates) {
    firebase.database().ref(path).update(updates);
  }

  setData(path, data) {
    firebase.database().ref(path).set(data);
  }
  readData(path) {
    return firebase.database().ref(path);
  }

  getObjectByKeyValue(rootRefPath: string, field: string, value: any) {
    const rootRef = firebase.database().ref(rootRefPath);
    let separateObject;
    rootRef.orderByChild(field).equalTo(value).on('child_added', function(filteredData) {
       firebase.database().ref(`${rootRefPath}/${filteredData.key}`).on('value', function(separateObjectResponse) {
        separateObject = separateObjectResponse.val();
      });
    });

    return Observable.create((observer) => {
      let counter = 0;
      const checkingInterval = setInterval(() => {
        if (separateObject) {
          counter = +1;
          observer.next(separateObject);
          observer.complete();
          clearInterval(checkingInterval);
        } else {
          if (counter > 20) {
            clearInterval(checkingInterval);
            observer.next('data not received');
            observer.complete();
          }
        }
      }, 200);
    });
  }

}
