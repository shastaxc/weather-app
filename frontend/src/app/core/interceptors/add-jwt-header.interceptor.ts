import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '@/library/services/auth.service';
import { valueExists } from '@/library/util/helper-fns';

@Injectable()
export class AddJwtHeaderInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  /**
   * Add authorization header with JWT if available
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt = this.authService.jwtValue;
    if (valueExists(jwt)) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${jwt}`,
        },
      });
    }
    return next.handle(request);
  }
}
