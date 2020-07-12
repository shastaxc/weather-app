import { Controller, Logger, Get, Param } from '@nestjs/common';
import { Routes } from 'src/common/constants/route.const';
import { WeatherService } from './weather.service';
import { Observable } from 'rxjs';
import { IWeatherSearchResponse, IOpenWeatherMapsLocation, IWeatherData, ILocationWeatherPair } from 'src/common/models/weather.model';
import { map } from 'rxjs/operators';

@Controller(`${Routes.API_ROUTE}/weather`)
export class WeatherController {
  private readonly logger = new Logger(WeatherController.name);

  constructor(private weatherService: WeatherService) {}

  @Get('/:locationName')
  getWeatherData(@Param('locationName') locationName: string): Observable<IWeatherSearchResponse> {
    this.logger.debug(`Received weather request.`);
    // Search OWM Location data for matches
    const locations: IOpenWeatherMapsLocation[] = this.weatherService.findLocation(locationName);
    // If no results, call OWM API using city name
    if (locations.length === 0) {
      return this.weatherService.getWeatherByName(locationName).pipe(
        map((weatherData: IWeatherData[]) => {
          if (weatherData.length === 0) {
            return [];
          }
          const relatedLocation = this.weatherService.deriveLocationFromWeatherData(weatherData[0]);
          return this.weatherService.pairLocationWithWeather([relatedLocation], weatherData);
        }),
        map((pairs: ILocationWeatherPair[]) => ({
          results: pairs
        }))
      );
    }
    // Call OWM API using location IDs to get weather data
    return this.weatherService.getWeatherDataById(locations).pipe(
      map((weatherData: IWeatherData[]) => {
        return this.weatherService.pairLocationWithWeather(locations, weatherData);
      }),
      map((pairs: ILocationWeatherPair[]) => ({
        results: pairs
      }))
    );
  }
}
