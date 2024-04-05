import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptors} from '@angular/common/http';
import {GlobalConfig, provideToastr, ToastrService} from 'ngx-toastr';
import {provideAnimations} from '@angular/platform-browser/animations';
import {appInterceptor} from './app.interceptor';

const TOAST_CONFIG: Partial<GlobalConfig> = {toastClass: 'toast'};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), provideHttpClient(withInterceptors([appInterceptor])),
    provideAnimations(), provideToastr(TOAST_CONFIG),
  ]
};
