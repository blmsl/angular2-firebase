import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AngularFire} from "angularfire2";
import {AuthServiceService} from "../../shared/services/auth-service.service";
import * as firebase from "firebase"
import {Router} from "@angular/router";

declare let $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,AfterViewInit {
  public singInForm:FormGroup;

  constructor(public fb:FormBuilder,
              public angularFire:AngularFire,
              public authService: AuthServiceService,
              private router:Router) { }

  ngOnInit() {
    this.singInForm= this.fb.group({
      email:'',
      password:''
    })
  }

  singIn()  {
    this.authService.singIn(this.singInForm.value.email, this.singInForm.value.password).then((response)=>{
      this.router.navigate(['../dashboard'])
    })
  }

  ngAfterViewInit() {
  }

}
