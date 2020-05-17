import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  const createComponent = createComponentFactory({
    component: AppComponent,
    imports: [
      // RouterTestingModule required because of <router-outlet>
      RouterTestingModule,
    ],
    schemas: [NO_ERRORS_SCHEMA],
  });

  let spectator: Spectator<AppComponent>;

  beforeEach(() => (spectator = createComponent()));

  it('should create the app', () => {
    const app = spectator.component;
    expect(app).toBeTruthy();
  });

  it("should have as title 'frontend'", () => {
    const app = spectator.component;
    expect(app.title).toEqual('frontend');
  });
});
