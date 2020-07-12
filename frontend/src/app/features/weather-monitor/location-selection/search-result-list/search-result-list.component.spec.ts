import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

import { SearchResultListComponent } from './search-result-list.component';

describe('SearchResultListComponent', () => {
  let spectator: Spectator<SearchResultListComponent>;
  const createComponent = createComponentFactory(SearchResultListComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
