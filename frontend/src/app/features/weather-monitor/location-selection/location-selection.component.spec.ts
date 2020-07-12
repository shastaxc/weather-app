import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { LocationSelectionComponent } from './location-selection.component';

describe('LocationSelectionComponent', () => {
  let spectator: Spectator<LocationSelectionComponent>;
  const createComponent = createComponentFactory(LocationSelectionComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
