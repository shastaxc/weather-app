import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LayoutModule } from '@/layout/layout.module';
import { SharedModule } from '@/shared/shared.module';
import { WeatherMonitorComponent } from './weather-monitor.component';
import { weatherMonitorRoutes } from './weather-monitor.routes';

const ROUTES = [...weatherMonitorRoutes];

@NgModule({
  imports: [RouterModule.forChild(ROUTES), SharedModule, LayoutModule],
  declarations: [WeatherMonitorComponent],
})
export class WeatherMonitorModule {}
