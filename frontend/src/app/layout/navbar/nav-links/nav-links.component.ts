import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@/library/services/auth.service';

@Component({
  selector: 'sfwa-nav-links',
  templateUrl: './nav-links.component.html',
  styleUrls: ['./nav-links.component.scss'],
})
export class NavLinksComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
