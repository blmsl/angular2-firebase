import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthServiceService } from '../../shared/services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(public fb: FormBuilder,
              public authServiceService: AuthServiceService,
              public router: Router) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      email: '',
      password: ''
    });
  }

  registration() {
    console.log('this.registrationForm.value', this.registrationForm.value);
    this.authServiceService.registration(this.registrationForm.value.email, this.registrationForm.value.password).then(() => {
    this.router.navigate(['/login']);
    });
  }

}
