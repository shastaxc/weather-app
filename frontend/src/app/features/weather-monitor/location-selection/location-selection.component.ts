import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ILocationWeatherPair } from '@/library/models/weather.model';
import { WeatherService } from '@/library/services/weather.service';

@Component({
  selector: 'sfwa-location-selection',
  templateUrl: './location-selection.component.html',
  styleUrls: ['./location-selection.component.scss'],
})
export class LocationSelectionComponent implements OnInit {
  locationSearchForm: FormGroup;
  results: ILocationWeatherPair[];

  get locationControl(): FormControl {
    return this.locationSearchForm.get('location') as FormControl;
  }

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.locationSearchForm = this.buildForm();
  }

  private buildForm(): FormGroup {
    return new FormGroup({
      location: new FormControl(),
    });
  }

  submit(): void {
    this.weatherService.getWeather(this.locationControl.value).subscribe(
      (results: ILocationWeatherPair[]) => {
        this.results = results;
      },
      (err: HttpErrorResponse) => {
        // Handle error
      }
    );
  }
}
