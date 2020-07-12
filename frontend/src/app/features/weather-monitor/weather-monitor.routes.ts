import { Route } from '@angular/router';

import { AuthGuard } from '@/library/guards/auth.guard';
import { WeatherMonitorComponent } from './weather-monitor.component';

export const weatherMonitorRoutes: Route[] = [
  {
    path: 'weather-monitor',
    component: WeatherMonitorComponent,
    canActivate: [AuthGuard],
  },
];
