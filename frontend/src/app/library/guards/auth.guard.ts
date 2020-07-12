import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

/**
 * Protects frontend routing from unauthorized access to routes.
 * Also redirects users and invalidates JWT if expired.
 */
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    const isLoggedIn = this.authService.isLoggedIn();

    // Check if user is logged in
    if (!isLoggedIn) {
      this.notLoggedIn();
      return false;
    }

    // Check if JWT is expired
    if (this.authService.isJwtExpired()) {
      this.ejectExpiredUser();
      return false;
    }

    return true;
  }

  private notLoggedIn(): void {
    this.router.navigate(['/login']);
  }

  private ejectExpiredUser(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
