import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InterceptorsModule } from './core/interceptors/interceptors.module';
import { LoginModule } from './features/login/login.module';
import { UserRegistrationModule } from './features/user-registration/user-registration.module';
import { WeatherMonitorModule } from './features/weather-monitor/weather-monitor.module';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    LayoutModule,
    LoginModule,
    UserRegistrationModule,
    InterceptorsModule,
    WeatherMonitorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
