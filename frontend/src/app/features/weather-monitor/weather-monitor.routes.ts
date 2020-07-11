import { Route } from '@angular/router';

import { WeatherMonitorComponent } from './weather-monitor.component';

export const weatherMonitorRoutes: Route[] = [
  {
    path: 'weather-monitor',
    component: WeatherMonitorComponent,
  },
];
