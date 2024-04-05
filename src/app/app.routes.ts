import {Routes} from '@angular/router';
import {isAuthorizedMatcher} from './shared/guards/auth.guard';

export const routes: Routes = [
  {path: '', pathMatch: 'full', canMatch: [isAuthorizedMatcher], loadComponent: () => import('./pages/home/home.component')},
  {path: '', pathMatch: 'full', loadComponent: () => import('./pages/not-authorized/not-authorized.component')},
  {path: '**', loadComponent: () => import('./pages/not-found/not-found.component'), pathMatch: 'full'}
];
