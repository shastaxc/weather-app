import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AppUser, ICredentials } from '@/library/models/user.model';
import { AuthService } from '@/library/services/auth.service';

@Component({
  selector: 'sfwa-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isProcessing: boolean;

  constructor(private authService: AuthService, private router: Router) {}

  get emailControl(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  ngOnInit(): void {
    this.isProcessing = false;
    this.loginForm = this.buildForm();
  }

  private buildForm(): FormGroup {
    return new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
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
        this.router.navigate(['/weather-monitor']);
      },
      (err: HttpErrorResponse) => {
        this.isProcessing = false;
        // Handle errors
        // Trigger validation
      }
    );
  }
}
