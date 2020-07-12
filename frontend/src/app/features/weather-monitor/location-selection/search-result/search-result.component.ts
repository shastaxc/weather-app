import { Component, Input } from '@angular/core';

import { ILocationWeatherPair } from '@/library/models/weather.model';

@Component({
  selector: 'sfwa-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent {
  @Input() data: ILocationWeatherPair;

  get city(): string {
    return this.data.location.name;
  }

  get country(): string {
    return this.data.location.country;
  }

  get weatherDesc(): string {
    return this.capitalizeFirst(this.data.weatherData.weather[0].description);
  }

  private capitalizeFirst(str: string): string {
    return str.length > 0 ? str.charAt(0).toUpperCase() + str.slice(1) : str;
  }
}
