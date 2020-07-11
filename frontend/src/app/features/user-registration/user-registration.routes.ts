import { Route } from '@angular/router';

import { UserRegistrationComponent } from './user-registration.component';

export const userRegistrationRoutes: Route[] = [
  {
    path: 'register',
    component: UserRegistrationComponent,
  },
];
