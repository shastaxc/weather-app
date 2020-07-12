import { Component, Input } from '@angular/core';

import { ILocationWeatherPair } from '@/library/models/weather.model';

@Component({
  selector: 'sfwa-search-result-list',
  templateUrl: './search-result-list.component.html',
  styleUrls: ['./search-result-list.component.scss'],
})
export class SearchResultListComponent {
  @Input() results: ILocationWeatherPair[];
}
