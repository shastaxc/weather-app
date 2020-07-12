import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LayoutModule } from '@/layout/layout.module';
import { SharedModule } from '@/shared/shared.module';
import { LocationSelectionComponent } from './location-selection/location-selection.component';
import { SearchResultListComponent } from './location-selection/search-result-list/search-result-list.component';
import { SearchResultComponent } from './location-selection/search-result/search-result.component';
import { WeatherMonitorComponent } from './weather-monitor.component';
import { weatherMonitorRoutes } from './weather-monitor.routes';

const ROUTES = [...weatherMonitorRoutes];

@NgModule({
  imports: [RouterModule.forChild(ROUTES), SharedModule, LayoutModule],
  declarations: [
    WeatherMonitorComponent,
    LocationSelectionComponent,
    SearchResultComponent,
    SearchResultListComponent,
  ],
})
export class WeatherMonitorModule {}
