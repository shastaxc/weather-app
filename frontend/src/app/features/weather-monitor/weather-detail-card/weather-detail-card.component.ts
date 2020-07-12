import { Component, Input } from '@angular/core';

import { ILocationWeatherPair } from '@/library/models/weather.model';
import { WeatherService } from '@/library/services/weather.service';
import { capitalizeFirst } from '@/library/util/helper-fns';

@Component({
  selector: 'sfwa-weather-detail-card',
  templateUrl: './weather-detail-card.component.html',
  styleUrls: ['./weather-detail-card.component.scss'],
})
export class WeatherDetailCardComponent {
  @Input() data: ILocationWeatherPair;

  get city(): string {
    return this.data.location.name;
  }

  get state(): string {
    return this.data.location.state;
  }

  get dateSearched(): Date {
    return new Date(this.data.weatherData.dt);
  }

  get weatherDesc(): string {
    return capitalizeFirst(this.data.weatherData.weather[0].description);
  }

  get weatherIconCode(): string {
    return this.data.weatherData.weather[0].icon;
  }

  get temperature(): number {
    const tempF = (this.data.weatherData.main.temp - 273.15) * 1.8 + 32;
    return tempF;
  }

  get pressure(): number {
    return this.data.weatherData.main.pressure;
  }

  get humidity(): number {
    return this.data.weatherData.main.humidity;
  }

  get sunrise(): Date {
    return new Date(this.data.weatherData.sys.sunrise);
  }

  get sunset(): Date {
    return new Date(this.data.weatherData.sys.sunset);
  }

  constructor(private weatherService: WeatherService) {}

  removeFromTracking(): void {
    this.weatherService.removeTrackedData(this.data.location.id);
  }
}
