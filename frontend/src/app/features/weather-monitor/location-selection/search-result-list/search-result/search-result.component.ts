import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ILocationWeatherPair } from '@/library/models/weather.model';
import { capitalizeFirst } from '@/library/util/helper-fns';

@Component({
  selector: 'sfwa-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent {
  @Input() data: ILocationWeatherPair;
  @Output() selectedForTracking: EventEmitter<ILocationWeatherPair>;

  constructor() {
    this.selectedForTracking = new EventEmitter<ILocationWeatherPair>();
  }

  get city(): string {
    return this.data.location.name;
  }

  get state(): string {
    return this.data.location.state;
  }

  get weatherDesc(): string {
    return capitalizeFirst(this.data.weatherData.weather[0].description);
  }

  addToTracker(): void {
    this.selectedForTracking.emit(this.data);
  }
}
