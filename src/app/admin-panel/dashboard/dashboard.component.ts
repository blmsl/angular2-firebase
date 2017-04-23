import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as firebase from "firebase/app";
import {Router} from "@angular/router";

declare let $:any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit,AfterViewInit {

  constructor(private router:Router) { }

  ngOnInit() {

  }

  singOut() {
    let self = this;
    firebase.auth().signOut().then(function() {
      self.router.navigate(['/login'])
    })
  }
  ngAfterViewInit() {
    $(".button-collapse").sideNav({
      menuWidth: 300, // Default is 300
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true // Choose whether you can drag to open on touch screens
      }
    );
    $(".shut-down").sideNav('hide');
  }

}
