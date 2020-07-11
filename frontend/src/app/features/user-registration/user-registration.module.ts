import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@/shared/shared.module';
import { UserRegistrationComponent } from './user-registration.component';
import { userRegistrationRoutes } from './user-registration.routes';

const ROUTES = [...userRegistrationRoutes];

@NgModule({
  imports: [RouterModule.forChild(ROUTES), SharedModule],
  declarations: [UserRegistrationComponent],
})
export class UserRegistrationModule {}
