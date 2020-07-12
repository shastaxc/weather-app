import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '@/library/services/auth.service';

@Injectable()
export class JwtExpInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) {}

  /**
   * Before sending a request, check if user's JWT is expired
   * If expired, logout user, redirect to login page, and block request
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isLoggedIn() && this.authService.isJwtExpired()) {
      console.log('(Interceptor) JWT is expired');
      this.authService.logout();
      this.router.navigate(['/login']);
      return;
    }
    return next.handle(request);
  }
}
