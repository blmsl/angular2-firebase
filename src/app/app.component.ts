import {Component, OnInit} from '@angular/core';
import { initializeApp, database } from 'firebase'
import { Constants } from "./shared/core/constants"
import {AngularFire, FirebaseListObservable} from "angularfire2";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  constructor(private af: AngularFire) {

  }
  ngOnInit() {


    // initializeApp(Constants.fireBaseConfig);
    // let root = database().ref('message/2');
    // root.on('value', function (snap) {
    //   console.log('snap',snap.val());
    // })
  }


}
