import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Routes } from '../constants/routing.const';
import { ILocationWeatherPair, IWeatherSearchResponse } from '../models/weather.model';
import { valueExists } from '../util/helper-fns';

const ROUTE = `${Routes.API_ROUTE}/weather`;

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private _trackedData: BehaviorSubject<ILocationWeatherPair[]>;

  get trackedData$(): Observable<ILocationWeatherPair[]> {
    return this._trackedData.asObservable();
  }

  constructor(private http: HttpClient) {
    this._trackedData = new BehaviorSubject<ILocationWeatherPair[]>([]);
  }

  getWeather(locationName: string): Observable<ILocationWeatherPair[]> {
    return this.http
      .get(`${ROUTE}/${locationName}`)
      .pipe(map((res: IWeatherSearchResponse) => res.results));
  }

  addTrackedData(data: ILocationWeatherPair): void {
    const trackedData = this._trackedData.value;
    // If this new data is already being tracked, do nothing
    if (
      !trackedData.find((d: ILocationWeatherPair) => d.location.id === data.location.id)
    ) {
      trackedData.push(data);
      this._trackedData.next(trackedData);
    }
  }

  removeTrackedData(idToRemove: number): void {
    // If data is being tracked, remove it
    const trackedData = this._trackedData.value;
    let indexToRemove: number;
    for (let i = 0; i < trackedData.length; i++) {
      if (trackedData[i].location.id === idToRemove) {
        indexToRemove = i;
        break;
      }
    }
    if (valueExists(indexToRemove)) {
      trackedData.splice(indexToRemove, 1);
      this._trackedData.next(trackedData);
    }
  }
}
