import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database"
import * as firebase from 'firebase'

@Injectable()
export class AuthServiceService {

  constructor(public afDatabase:AngularFireDatabase){}

  public registration(email,password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Handle Errors here.
        console.log(error);
      });
  };

  public singIn(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.

      console.log('error.message',error.message);
      var errorMessage = error.message;
      // ...
    })
  }
  public getAllData() {
    return this.afDatabase.list('courses')
  };
}
