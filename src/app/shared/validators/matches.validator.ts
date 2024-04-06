import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export const matchValidator = (fieldOne: string, fieldTwo: string): ValidatorFn => (control: AbstractControl): ValidationErrors | null => {
  if (!(control instanceof FormGroup)) throw new Error('Match validator can only be used on form groups');

  const controlOne = control.get(fieldOne);
  const controlTwo = control.get(fieldTwo);

  if (controlOne?.invalid || controlTwo?.invalid) return null;
  control?.markAsTouched();

  return controlOne?.value === controlTwo?.value ? null : { mismatch: true };
};
