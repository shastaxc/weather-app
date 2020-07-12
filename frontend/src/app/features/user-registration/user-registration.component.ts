import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { AppUser, ICredentials } from '@/library/models/user.model';
import { UserService } from '@/library/services/user.service';
import { MyValidators } from '@/library/util/form-validators';

@Component({
  selector: 'sfwa-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
})
export class UserRegistrationComponent {
  registrationForm: FormGroup;
  isProcessing: boolean;
  private _alreadyRegisteredError: BehaviorSubject<boolean>;

  constructor(private userService: UserService, private router: Router) {
    this._alreadyRegisteredError = new BehaviorSubject<boolean>(false);
  }

  get emailControl(): FormControl {
    return this.registrationForm.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.registrationForm.get('password') as FormControl;
  }

  ngOnInit(): void {
    this.isProcessing = false;
    this.registrationForm = this.buildForm();
  }

  private buildForm(): FormGroup {
    return new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        MyValidators.boolMatch(this._alreadyRegisteredError, false),
      ]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  submit(): void {
    this.isProcessing = true;
    const credentials: ICredentials = {
      email: this.emailControl.value,
      password: this.passwordControl.value,
    };
    this.userService.createUser(credentials).subscribe(
      (user: AppUser) => {
        this.isProcessing = false;
        this.router.navigate(['/login']);
      },
      (err: HttpErrorResponse) => {
        this.isProcessing = false;
        // Handle errors
        if (err.status === 409) {
          this._alreadyRegisteredError.next(true);
          this.emailControl.updateValueAndValidity();
          this.passwordControl.updateValueAndValidity();
        }
      }
    );
  }
}
