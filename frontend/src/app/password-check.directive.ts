import { Validator, NG_VALIDATORS, AbstractControl } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appPasswordCheck]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordCheckDirective,
      multi: true,
    },
  ],
})
export class PasswordCheckDirective implements Validator {
  constructor() {}
  @Input() appPasswordCheck: string;
  validate(control: AbstractControl): { [key: string]: any } | null {
    const controlToCompare = control.parent.get(this.appPasswordCheck);
    if (controlToCompare && controlToCompare.value !== control.value) {
      return { onEqual: true };
    }
    return null;
  }
}
