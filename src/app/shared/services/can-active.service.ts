import { Injectable } from '@angular/core';
import { CanActivate } from "@angular/router";
import * as firebase from 'firebase'
import {Observable} from "rxjs/Observable";

@Injectable()
export class CanActiveService implements CanActivate{

  constructor() { }

  canActivate() {
    return  Observable.create((observer)=>{
      let access;
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) access = true;
        else access = false;
        observer.next(access);
        console.log('access',access);
        console.log('user',user);
        observer.complete();
      });

      }
    );

  }
}
