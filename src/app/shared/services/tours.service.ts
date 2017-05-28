import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import {Observable} from "rxjs/Observable";

import * as firebase from "firebase/app";

declare interface someThing {
    value:{
      value:string
    };
}

@Injectable()
export class ToursService {

  constructor(public afDatabase: AngularFireDatabase) { }

  list(value,query?){
    return this.afDatabase.list(value) ;
  }

  Object(path){
    return this.afDatabase.object(path);
  }
  updateData(path,updates) {
    firebase.database().ref(path).update(updates);
  }

  setData(path,data) {
    firebase.database().ref(path).set(data);
  }
  readData(path) {
    firebase.database().ref(path)
  }

  getTourDetails(key:string) {
    return this.afDatabase.object(`tours/${key}`);
  }

}
