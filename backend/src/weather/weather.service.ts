import { Injectable, Logger, HttpService } from '@nestjs/common';
import { OPEN_WEATHER_KEY } from 'src/common/constants/api-keys.const';
import { map, catchError } from 'rxjs/operators';
import { AxiosResponse } from 'axios';
import { Observable, throwError, of } from 'rxjs';
import { IWeatherData, IOpenWeatherMapsLocation, IWeatherSearchResults, ILocationWeatherPair } from 'src/common/models/weather.model';
import { readFileSync } from 'fs';
import { join } from 'path';
import { valueExists } from 'src/common/util/helper-fns';

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);
  private allLocations: IOpenWeatherMapsLocation[];

  constructor(private http: HttpService) {
    this.allLocations = JSON.parse(readFileSync(join(__dirname, '../assets/city.list.json'), 'utf8'));
    // We only need US cities, filter out the rest
    this.allLocations = this.allLocations.filter((location: IOpenWeatherMapsLocation) => location.country === 'US');
  }

  getWeatherByName(locationName: string): Observable<IWeatherData[]> {
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${locationName}&appid=${OPEN_WEATHER_KEY}`).pipe(
      map((response: AxiosResponse<IWeatherData>) => [response.data]),
      catchError((err: any) => {
        return of([]);
        // if (err === 'Error: Request failed with status code 404') {
        //   return of([]);
        // }
        // return throwError(err);
      })
    );
  }

  getWeatherDataById(locations: IOpenWeatherMapsLocation[]): Observable<IWeatherData[]> {
    const ids = locations.map((location: IOpenWeatherMapsLocation) => location.id);
    const idsStr = ids.join(',');
    return this.http.get(`https://api.openweathermap.org/data/2.5/group?id=${idsStr}&appid=${OPEN_WEATHER_KEY}`).pipe(
      map((response: AxiosResponse<IWeatherSearchResults>) => response.data.list),
    );
  }

  findLocation(nameToFind: string): IOpenWeatherMapsLocation[] {
    // Filter out non-matching city names
    return this.allLocations.filter((location: IOpenWeatherMapsLocation) => {
      return location.name.toLowerCase() === nameToFind.toLowerCase();
    })
    .slice(0, 5)
    // Sort by state
    .sort((a: IOpenWeatherMapsLocation, b: IOpenWeatherMapsLocation) => {
      if (a.state === b.state) { return 0; }
      else if (a.state < b.state) {
        return -1;
      }
      return 1;
    });
  }

  /**
   * When searching for weather data by name, if an exact match it not found, a result for a nearby
   * location is returned. This creates the location data object based on that returned data.
   */
  deriveLocationFromWeatherData(weatherData: IWeatherData): IOpenWeatherMapsLocation {
    return this.allLocations.find((location: IOpenWeatherMapsLocation) => location.id === weatherData.id);
  }

  pairLocationWithWeather(locations: IOpenWeatherMapsLocation[], weatherData: IWeatherData[]): ILocationWeatherPair[] {
    const pairs: ILocationWeatherPair[] = [];
    for(const location of locations) {
      pairs.push({
        location,
        weatherData: weatherData.find((data: IWeatherData) => data.id === location.id)
      });
    }
    return pairs;
  }

  cleanSearchStr(searchStr: string): string {
    // If string contains a comma, truncate starting at comma
    const firstCommaIndex = searchStr.indexOf(',');
    if (firstCommaIndex > -1) {
      searchStr = searchStr.substring(0, firstCommaIndex);
    }

    // Remove trailing and leading whitespace
    searchStr.trim();
    return searchStr;
  }
}
