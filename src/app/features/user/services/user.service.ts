import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, delay, switchMap, tap, throwError} from 'rxjs';
import {User} from '../models/user.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private refreshUsers$ = new BehaviorSubject<void>(undefined);
  readonly baseURL = environment.baseURL;

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.refreshUsers$.pipe(
      delay(300),
      switchMap(() => this.http.get<User[]>(`${this.baseURL}/users`).pipe(
        catchError(error => throwError(() => new Error(error)))
      )),
    );
  }

  patchOne(user: User) {
    return this.http.patch<User>(`${this.baseURL}/users/${user.id}`, user).pipe(
      tap(() => this.refreshUsers$.next())
    );
  }

  deleteOne(id: User['id']) {
    return this.http.delete<User>(`${this.baseURL}/users/${id}`).pipe(
      tap(() => {
        this.refreshUsers$.next();
      }),
    );
  }

  postOne(user: User) {
    return this.http.post<User>(`${this.baseURL}/users`, user).pipe(
      tap(() => this.refreshUsers$.next())
    );
  }
}
