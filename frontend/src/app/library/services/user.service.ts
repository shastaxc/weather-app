import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Routes } from '../constants/routing.const';
import { AppUser, IAppUser, ICredentials } from '../models/user.model';

const ROUTE = `${Routes.API_ROUTE}/user`;

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  createUser(credentials: ICredentials): Observable<AppUser> {
    return this.http
      .post(`${ROUTE}`, credentials)
      .pipe(map((user: IAppUser) => plainToClass(AppUser, user)));
  }
}
