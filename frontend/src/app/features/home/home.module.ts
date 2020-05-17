import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@/shared/shared.module';
import { HomeComponent } from './home.component';
import { homeRoutes } from './home.routes';

const ROUTES = [...homeRoutes];

@NgModule({
  imports: [RouterModule.forChild(ROUTES), SharedModule],
  declarations: [HomeComponent],
})
export class HomeModule {}
