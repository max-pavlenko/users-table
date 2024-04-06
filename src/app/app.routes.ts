import {Routes} from '@angular/router';
import {isAuthorizedMatcher} from './pages/guards/auth.guard';

export const routes: Routes = [
  {path: '', pathMatch: 'full', canMatch: [isAuthorizedMatcher], loadComponent: () => import('./pages/ui/home/home.component')},
  {path: '', pathMatch: 'full', loadComponent: () => import('./pages/ui/not-authorized/not-authorized.component')},
  {path: '**', loadComponent: () => import('./pages/ui/not-found/not-found.component'), pathMatch: 'full'}
];
