import { ValidationErrors, ValidatorFn } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

export class MyValidators {
  public static boolMatch(input: BehaviorSubject<boolean>, bool: boolean): ValidatorFn {
    return (): ValidationErrors | null => {
      return input.value === bool ? null : { boolMatch: `Input required to be ${bool}.` };
    };
  }
}
