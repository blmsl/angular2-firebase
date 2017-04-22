import { Injectable } from '@angular/core';
import {AngularFire} from "angularfire2";
import * as firebase from "firebase/app";

@Injectable()
export class ToursService {
  courses = firebase.database().ref('courses')

  constructor(public af: AngularFire) { }

  tours(){
    return this.af.database.list('tours')
  }

  saveFile() {
    return firebase.storage()
  }


}
