import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {catchError, throwError} from 'rxjs';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastrService);

  return next(req).pipe(
    catchError((error) => {
      toast.error(error.message, undefined, {positionClass: 'toast-top-left'});
      return throwError(() => error);
    })
  );
};
