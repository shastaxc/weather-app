import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { ILocationWeatherPair } from '@/library/models/weather.model';
import { WeatherService } from '@/library/services/weather.service';

@Component({
  selector: 'sfwa-weather-monitor',
  templateUrl: './weather-monitor.component.html',
  styleUrls: ['./weather-monitor.component.scss'],
})
export class WeatherMonitorComponent {
  trackedData$: Observable<ILocationWeatherPair[]>;

  constructor(private weatherService: WeatherService) {
    this.trackedData$ = this.weatherService.trackedData$;
  }
}
