import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthServiceService} from '../../shared/services/auth-service.service';
import {Router} from '@angular/router';

declare const $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  public singInForm: FormGroup;
  public openAlertModal = false;

  constructor(public fb: FormBuilder,
              public authService: AuthServiceService,
              private router: Router) { }

  ngOnInit() {
    this.singInForm = this.fb.group({
      email: '',
      password: ''
    });
  }
  closeModal(event) {
    this.openAlertModal = false;
  }

  singIn() {
    this.authService.singIn(this.singInForm.value.email, this.singInForm.value.password).then((response) => {
      console.log('response', response);
      if (response) { this.router.navigate(['/dashboard']); }
      else { this.openAlertModal = true; }
    }, (error) => {
    });
  }

  ngAfterViewInit() {
  }

}
