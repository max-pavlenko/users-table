import {inject, Pipe, PipeTransform} from '@angular/core';
import {ValidationErrors} from '@angular/forms';
import {VALIDATION_ERROR_MESSAGES} from '../tokens/validation-error-messages.token';

@Pipe({
  name: 'errorMessage',
  standalone: true
})
export class ErrorMessagePipe implements PipeTransform {
  errorMessages = inject(VALIDATION_ERROR_MESSAGES)

  transform(value: ValidationErrors | null | undefined, additionalData: Record<string, unknown> = {}) {
    if (!value) return;
    const [[key, data]] = Object.entries(value);
    return this.errorMessages[key]({...data, ...additionalData}) ?? 'Invalid field';
  }

}
