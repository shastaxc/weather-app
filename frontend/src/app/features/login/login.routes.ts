import { Route } from '@angular/router';

import { LoginComponent } from './login.component';

export const loginRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
