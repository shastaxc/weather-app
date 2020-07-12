import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

import { WeatherDetailCardComponent } from './weather-detail-card.component';

describe('WeatherDetailCardComponent', () => {
  let spectator: Spectator<WeatherDetailCardComponent>;
  const createComponent = createComponentFactory(WeatherDetailCardComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
