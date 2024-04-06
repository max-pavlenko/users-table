import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {ModalComponent} from '../../../../shared/ui/atoms/modal/modal.component';
import {ButtonComponent} from '../../../../shared/ui/atoms/button/button.component';
import {FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserCredentialsFormFields, UserManagementFormFields} from './user-fields.type';
import {JsonPipe, NgOptimizedImage, NgStyle} from '@angular/common';
import {ControlComponent} from '../../../../shared/ui/atoms/control/control.component';
import {matchValidator} from '../../../../shared/validators/matches.validator';
import {ErrorComponent} from '../../../../shared/ui/atoms/error/error.component';
import {User, UserType} from '../../models/user.model';
import {DynamicValidatorMessageDirective} from '../../../../shared/directives/dynamic-validator-message.directive';

@Component({
  selector: 'ut-user-management-modal',
  standalone: true,
  imports: [
    ModalComponent,
    ButtonComponent,
    ReactiveFormsModule,
    NgOptimizedImage,
    JsonPipe,
    ControlComponent,
    NgStyle,
    ErrorComponent,
    DynamicValidatorMessageDirective
  ],
  templateUrl: './user-management-modal.component.html',
  styleUrl: './user-management-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserManagementModalComponent {
  @Output() closed = new EventEmitter<void>();
  @Output() deleted = new EventEmitter<User['id']>();
  @Output() submitted = new EventEmitter<User>();

  @Input() set defaultValues(user: User | undefined) {
    this._defaultValues = user;
    if (!user) this.form.reset();
    else this.form.reset({
      ...user,
      [UserManagementFormFields.Credentials]: {[UserCredentialsFormFields.Password]: user.password},
    });
  };

  _defaultValues?: User;

  form = this.fb.group<Record<UserManagementFormFields, FormControl | FormGroup>>({
    [UserManagementFormFields.Username]: this.fb.control('', [Validators.required]),
    [UserManagementFormFields.FirstName]: this.fb.control('', [Validators.required]),
    [UserManagementFormFields.LastName]: this.fb.control('', [Validators.required]),
    [UserManagementFormFields.Email]: this.fb.control('', [Validators.required, Validators.email]),
    [UserManagementFormFields.Credentials]: this.fb.group({
      [UserCredentialsFormFields.Password]: this.fb.control('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).+$/)]),
      [UserCredentialsFormFields.ConfirmPassword]: this.fb.control('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).+$/)]),
    }, {
      validators: matchValidator(UserCredentialsFormFields.Password, UserCredentialsFormFields.ConfirmPassword),
    }),
    [UserManagementFormFields.Type]: this.fb.control<UserType>(UserType.User, [Validators.required]),
  },);

  constructor(private fb: NonNullableFormBuilder) {
  }

  get modalTitle() {
    return this._defaultValues ? `${this._defaultValues.firstName} ${this._defaultValues.lastName}` : 'Create new user';
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const {credentials: {password}, ...restForm} = this.form.getRawValue();
    this.submitted.emit({id: this._defaultValues?.id ?? crypto.randomUUID(), password, ...restForm});
  }

  protected readonly UserManagementFormFields = UserManagementFormFields;
  protected readonly UserType = UserType;
  protected readonly UserCredentialsFormFields = UserCredentialsFormFields;
}
