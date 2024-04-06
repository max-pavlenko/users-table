import {Component, HostBinding, Input} from '@angular/core';
import {ErrorMessagePipe} from '../../../pipes/error-message.pipe';
import {ValidationErrors} from '@angular/forms';
import {JsonPipe, KeyValuePipe} from '@angular/common';

@Component({
  selector: 'ut-error',
  standalone: true,
  imports: [
    ErrorMessagePipe,
    JsonPipe,
    KeyValuePipe
  ],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css',
})
export class ErrorComponent {
  @Input() errorData?: Record<string, unknown>;
  @Input({required: true}) errors: ValidationErrors | null = null;

  @HostBinding('class.hidden') get isHidden() {
    return !this.errors;
  };
}
