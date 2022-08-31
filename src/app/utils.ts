import { AbstractControl } from '@angular/forms';

export function ValidateCEP(control: AbstractControl) {
    if (control.value.length == 8) {
        return null
    }
    return { invalid: true };
}