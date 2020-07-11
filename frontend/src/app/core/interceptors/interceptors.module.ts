import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AddJwtHeaderInterceptor } from './add-jwt-header.interceptor';
import { JwtExpInterceptor } from './jwt-exp.interceptor';

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AddJwtHeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtExpInterceptor, multi: true },
  ],
})
export class InterceptorsModule {}
