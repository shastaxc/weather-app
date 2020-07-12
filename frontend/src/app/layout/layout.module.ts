import { NgModule } from '@angular/core';

import { SharedModule } from '@/shared/shared.module';
import { NavLinksComponent } from './navbar/nav-links/nav-links.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LayoutComponent } from './layout.component';

@NgModule({
  imports: [SharedModule],
  declarations: [NavbarComponent, LayoutComponent, NavLinksComponent],
  exports: [NavbarComponent, LayoutComponent],
})
export class LayoutModule {}
