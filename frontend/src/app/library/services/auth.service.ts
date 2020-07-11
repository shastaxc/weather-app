import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import * as decodeJwt from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { API_ROUTE } from '../constants/routing.constants';
import { AppUser, ICredentials } from '../models/user.model';
import { valueExists } from '../util/helper-fns';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _jwt: BehaviorSubject<string>;
  private _currentUser: BehaviorSubject<AppUser>;

  get jwt$(): Observable<string> {
    return this._jwt.asObservable();
  }
  get jwtValue(): string {
    return this._jwt.value;
  }

  get currentUser$(): Observable<AppUser> {
    return this._currentUser.asObservable();
  }
  get currentUserValue(): AppUser {
    return this._currentUser.value;
  }

  constructor(private http: HttpClient) {
    // When app starts, pull jwt and currentUser from localStorage if exists
    this._jwt = new BehaviorSubject<string>(localStorage.getItem('jwt'));
    this._currentUser = new BehaviorSubject<AppUser>(
      plainToClass(AppUser, JSON.parse(localStorage.getItem('currentUser')))
    );
  }

  login(credentials: ICredentials): Observable<AppUser> {
    return this.http.post(`${API_ROUTE}/auth/login`, credentials).pipe(
      map((body: string) => {
        const jwt: string = body;
        // Store JWT in local storage to keep user logged in between sessions
        localStorage.setItem('jwt', jwt);
        // Put JWT in memory
        this._jwt.next(jwt);

        // Store currentUser in local storage to keep user logged in between sessions
        const userJson: any = decodeJwt(jwt).user;
        localStorage.setItem('currentUser', JSON.stringify(userJson));

        // Put currentUser in memory
        const user: AppUser = plainToClass(AppUser, userJson);
        this._currentUser.next(user);
        return user;
      })
    );
  }

  logout(): void {
    // Remove JWT and user data from local storage
    localStorage.removeItem('jwt');
    this._jwt.next(null);
    localStorage.removeItem('currentUser');
    this._currentUser.next(null);
  }

  isLoggedIn(): boolean {
    return valueExists(this.currentUserValue);
  }

  isJwtExpired(): boolean {
    const jwt = this.jwtValue;
    if (!jwt) {
      return null;
    }
    const exp = decodeJwt(jwt).exp;
    return Date.now() / 1000 > exp;
  }
}
