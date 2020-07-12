import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { UserRegistrationComponent } from './user-registration.component';

describe('UserRegistrationComponent', () => {
  let spectator: Spectator<UserRegistrationComponent>;
  const createComponent = createComponentFactory(UserRegistrationComponent);

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });
});
