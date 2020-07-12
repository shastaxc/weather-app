import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Routes } from '../constants/routing.const';
import { ILocationWeatherPair, IWeatherSearchResponse } from '../models/weather.model';

const ROUTE = `${Routes.API_ROUTE}/weather`;

@Injectable({ providedIn: 'root' })
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeather(locationName: string): Observable<ILocationWeatherPair[]> {
    return this.http
      .get(`${ROUTE}/${locationName}`)
      .pipe(map((res: IWeatherSearchResponse) => res.results));
  }
}
