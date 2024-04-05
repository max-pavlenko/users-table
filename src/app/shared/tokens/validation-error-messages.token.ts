import {InjectionToken} from '@angular/core';

export const ERROR_MESSAGES: Record<string, (...args: any[]) => string> = {
  required: () => 'This field is required',
  email: () => 'Please enter a valid email address',
  minlength: ({requiredLength}) => `Must be at least ${requiredLength} characters long`,
  pattern: ({pattern}) => pattern ?? `Invalid field pattern`,
  mismatch: ({mismatch}) => mismatch ?? `These 2 fields dont match`,
}

export const VALIDATION_ERROR_MESSAGES = new InjectionToken('Validation messages', {
  providedIn: 'root',
  factory: () => ERROR_MESSAGES
})
