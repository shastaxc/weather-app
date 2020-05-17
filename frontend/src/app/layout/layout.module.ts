import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@/shared/shared.module';
import { NavLinksComponent } from './navbar/nav-links/nav-links.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidenavInnardsComponent } from './sidenav-innards/sidenav-innards.component';
import { LayoutComponent } from './layout.component';
import { layoutRoutes } from './layout.routes';
import { SidenavService } from './sidenav.service';

const ROUTES = [...layoutRoutes];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    SharedModule,
    MatToolbarModule,
    MatSidenavModule,
  ],
  declarations: [
    NavbarComponent,
    LayoutComponent,
    SidenavInnardsComponent,
    NavLinksComponent,
  ],
  providers: [SidenavService],
  exports: [LayoutComponent],
})
export class LayoutModule {}
