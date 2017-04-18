import { Injectable } from '@angular/core';
import { AngularFire } from "angularfire2";

@Injectable()
export class AuthServiceService {

  constructor(public af:AngularFire){}

  public registration() {
    return this.af.database.list('courses')
  };
  public getAllData() {
    return this.af.database.list('courses')
  };
}
