import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { WeatherMonitorComponent } from './weather-monitor.component';

describe('WeatherMonitorComponent', () => {
  let spectator: Spectator<WeatherMonitorComponent>;
  const createComponent = createComponentFactory(WeatherMonitorComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
