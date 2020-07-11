import { Component } from '@angular/core';

import { AuthService } from '@/library/services/auth.service';

@Component({
  selector: 'sfwa-nav-links',
  templateUrl: './nav-links.component.html',
  styleUrls: ['./nav-links.component.scss'],
})
export class NavLinksComponent {
  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
