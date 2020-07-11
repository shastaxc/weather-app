import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@/shared/shared.module';
import { LoginComponent } from './login.component';
import { loginRoutes } from './login.routes';

const ROUTES = [...loginRoutes];

@NgModule({
  imports: [RouterModule.forChild(ROUTES), SharedModule],
  declarations: [LoginComponent],
})
export class LoginModule {}
