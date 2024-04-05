import {Injectable} from '@angular/core';
import {AbstractControl} from '@angular/forms';

export interface ControlErrorMatcher {
  match({control}: {control: AbstractControl}): boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ErrorMatcher implements ControlErrorMatcher {

  constructor() { }

  match({control}: { control: AbstractControl }) {
    return control.invalid && control.touched;
  }
}

