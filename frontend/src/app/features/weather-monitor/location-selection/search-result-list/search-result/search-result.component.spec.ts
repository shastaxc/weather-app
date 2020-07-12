import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { SearchResultComponent } from './search-result.component';

describe('SearchResultComponent', () => {
  let spectator: Spectator<SearchResultComponent>;
  const createComponent = createComponentFactory(SearchResultComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
