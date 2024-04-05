import { Injectable } from '@angular/core';
import {delay, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthorized$ = of(true).pipe(
    delay(300)
  )

  constructor() { }
}
