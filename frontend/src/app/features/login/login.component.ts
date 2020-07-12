import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { AppUser, ICredentials } from '@/library/models/user.model';
import { AuthService } from '@/library/services/auth.service';
import { MyValidators } from '@/library/util/form-validators';

@Component({
  selector: 'sfwa-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isProcessing: boolean;
  private _authenticationError: BehaviorSubject<boolean>;

  constructor(private authService: AuthService, private router: Router) {
    this.isProcessing = false;
    this._authenticationError = new BehaviorSubject<boolean>(false);
  }

  get emailControl(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  ngOnInit(): void {
    this.loginForm = this.buildForm();

    console.log('this.emailControl', this.emailControl);
    console.log('this.passwordControl', this.passwordControl);
  }

  private buildForm(): FormGroup {
    return new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        MyValidators.boolMatch(this._authenticationError, false),
      ]),
    });
  }

  submit(): void {
    this.isProcessing = true;
    const credentials: ICredentials = {
      email: this.emailControl.value,
      password: this.passwordControl.value,
    };
    this.authService.login(credentials).subscribe(
      (user: AppUser) => {
        this.isProcessing = false;
        this._authenticationError.next(false);
        this.router.navigate(['/weather-monitor']);
      },
      (err: HttpErrorResponse) => {
        this.isProcessing = false;
        // Handle errors
        if (err.status === 401) {
          this._authenticationError.next(true);
          this.emailControl.updateValueAndValidity();
          this.passwordControl.updateValueAndValidity();
        }
      }
    );
  }
}
