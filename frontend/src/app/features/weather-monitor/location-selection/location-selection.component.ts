import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';

import { ILocationWeatherPair } from '@/library/models/weather.model';
import { WeatherService } from '@/library/services/weather.service';
import { valueExists } from '@/library/util/helper-fns';

@Component({
  selector: 'sfwa-location-selection',
  templateUrl: './location-selection.component.html',
  styleUrls: ['./location-selection.component.scss'],
})
export class LocationSelectionComponent implements OnInit {
  private _results: BehaviorSubject<ILocationWeatherPair[]>;

  get results$(): Observable<ILocationWeatherPair[]> {
    return this._results.asObservable();
  }

  locationSearchForm: FormGroup;

  get locationControl(): FormControl {
    return this.locationSearchForm.get('location') as FormControl;
  }

  @ViewChild('searchResultsContainer') searchResultsContainer: ElementRef;
  get searchResultsContainerEl(): HTMLElement {
    return this.searchResultsContainer?.nativeElement as HTMLElement;
  }
  @ViewChild('searchSubmitBtn') searchSubmitBtn: ElementRef;
  get searchSubmitBtnEl(): HTMLElement {
    return this.searchSubmitBtn?.nativeElement as HTMLElement;
  }

  // Close results container if it is showing and a click occurs outside of it
  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: MouseEvent): void {
    if (
      this.searchResultsContainerEl &&
      !this.searchResultsContainerEl.contains(event.target as Node)
    ) {
      this.closeResults();
    }
  }
  // Close results container if it is showing and a Esc key is pressed
  @HostListener('document:keyup.esc', ['$event'])
  keyEvent(): void {
    if (this.searchResultsContainerEl) {
      this.closeResults();
    }
  }

  constructor(private weatherService: WeatherService) {
    this._results = new BehaviorSubject<ILocationWeatherPair[]>(null);
  }

  ngOnInit(): void {
    this.locationSearchForm = this.buildForm();
  }

  private buildForm(): FormGroup {
    return new FormGroup({
      location: new FormControl(),
    });
  }

  submit(): void {
    this.weatherService
      .getWeather(this.locationControl.value)
      .pipe(
        // Filter out results that are already being tracked
        withLatestFrom(this.weatherService.trackedData$)
      )
      .subscribe(
        ([incomingData, trackedData]: [
          ILocationWeatherPair[],
          ILocationWeatherPair[]
        ]) => {
          // If incoming data is already empty, no results were found
          if (incomingData.length === 0) {
            this._results.next(incomingData);
            return;
          }

          // Filter out results that are already being tracked
          const filteredData = incomingData.filter((data: ILocationWeatherPair) => {
            if (trackedData.find((d) => d.location.id === data.location.id)) {
              return false;
            }
            return true;
          });

          // If there are no results left after filtering, do not show any results
          if (filteredData.length === 0) {
            this.closeResults();
            return;
          }

          // Otherwise, return remaining results
          this._results.next(filteredData);
        },
        (err: HttpErrorResponse) => {
          // Handle error
        }
      );
  }

  addToTracker(data: ILocationWeatherPair): void {
    // Add data to tracker
    this.weatherService.addTrackedData(data);

    // Remove from results list
    const results = this._results.value;

    // If this was last value in results, set to null
    if (results.length === 1) {
      this.closeResults();
      return;
    }

    // Remove data from results list
    let indexToRemove: number;
    for (let i = 0; i < results.length; i++) {
      if (results[i].location.id === data.location.id) {
        indexToRemove = i;
        break;
      }
    }
    if (valueExists(indexToRemove)) {
      results.splice(indexToRemove, 1);
      this._results.next(results);
    }
  }

  private closeResults(): void {
    this.closeResults();
  }
}
