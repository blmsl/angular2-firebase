import { Injectable } from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import * as firebase from 'firebase'
import {Observable} from "rxjs/Observable";

@Injectable()
export class CanActiveService implements CanActivate{

  constructor(private router:Router) { }

  canActivate() {
    let self = this;
    return  Observable.create((observer)=>{
      let access;
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) access = true;
        else {
          self.router.navigateByUrl('/login');
          access = false
        };
        observer.next(access);
        console.log('access',access);
        observer.complete();
      });
      }
    );

  }
}
