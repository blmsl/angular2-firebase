import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthServiceService} from "../../shared/services/auth-service.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(public fb: FormBuilder,
              public authServiceService: AuthServiceService) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      email:'',
      password:''
    })

    this.authServiceService.getAllData().subscribe((alldata)=>console.log('allData',alldata))
  }

  registration(form) {
    this.authServiceService.registration().subscribe()
  }

}
