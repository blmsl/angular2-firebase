import { Injectable } from '@angular/core';
import {AngularFire} from "angularfire2";
import * as firebase from "firebase/app";

@Injectable()
export class ToursService {

  constructor(public af: AngularFire) { }

  list(value){
    return this.af.database.list(value);
  }

  Object(path){
    return this.af.database.object(path);
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



}
