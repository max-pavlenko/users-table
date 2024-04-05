import {Attribute, ChangeDetectionStrategy, Component, inject, Input, TemplateRef} from '@angular/core';
import {ControlContainer, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {JsonPipe, NgClass, NgTemplateOutlet} from '@angular/common';
import {ErrorMessagePipe} from '../../../pipes/error-message.pipe';
import {ErrorComponent} from '../error/error.component';
import {DynamicValidatorMessageDirective} from '../../../directives/dynamic-validator-message.directive';

@Component({
  selector: 'ut-control',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgTemplateOutlet,
    JsonPipe,
    NgClass,
    ErrorMessagePipe,
    ErrorComponent,
    DynamicValidatorMessageDirective
  ],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  viewProviders: [{provide: ControlContainer, useFactory: () => inject(ControlContainer, {skipSelf: true})}],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlComponent {
  @Input({required: true}) set controlKey(key: string) {
    this.label = key.replace(/([A-Z])/g, ' $1');
    this._controlKey = key;
  }

  _controlKey = '';
  label = this._controlKey;
  @Input() type: 'text' | 'password' | 'number' = 'text';
  @Input() controlTemplate?: TemplateRef<unknown>;
  @Input() errorData?: Record<string, unknown>;

  constructor(protected controlContainer: ControlContainer, @Attribute('autocomplete') public autocomplete: string | null = null) {
  }

  get control() {
    return (this.controlContainer.control as FormGroup).controls[this._controlKey];
  }

  get isRequired() {
    return this.control.hasValidator(Validators.required);
  }

  get hasError() {
    return this.control.invalid && this.control.touched;
  }
}
