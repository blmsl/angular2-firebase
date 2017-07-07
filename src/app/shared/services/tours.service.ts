import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import * as firebase from 'firebase/app';

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
    firebase.database().ref(path);
  }

}
