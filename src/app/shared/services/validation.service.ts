import {Injectable} from '@angular/core';
import {Validators} from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class ValidationService {

    // TODO : Define interface.
    // TODO : Place into constants file.
    ngValidatorFunctionMap: Array<any> = [
        {
            simpleName: 'required',
            ngValidatorFunction: Validators.required
        }
    ];

    constructor() {
    }

    /**
     * Returns a map of how we've mapped simple names to Ng validators, and in the future custom validators.
     *
     * @return {any}
     */
    getNgValidationFunctionMap() {
        return this.ngValidatorFunctionMap;
    }

    /**
     * Takes in an array of simple validation names.
     *
     * These names map to Ng Validation functions, and can map to more complex custom validation functions.
     *
     * This allows us to leverage the power of Ng Validation, and custom validation, as well as giving us
     * the ability to create reusable validators, that can be used throughout our forms.
     *
     * Note: Validators.minLength requires Validators.required,
     *
     * TODO: Unit test.
     *
     * @param validators - ['required']
     */
    getNgValidators(validators: Array<string>) {

        let ngValidators: Array<any> = [];

        validators.map((validatorName) => {
            for (const ngValidatorFunction of this.getNgValidationFunctionMap()) {
                if (ngValidatorFunction.simpleName === validatorName) {
                    ngValidators.push(ngValidatorFunction.ngValidatorFunction);
                }
            }
        });

        return ngValidators;
    }

    /**
     * Checks if validators have been set on the control, an example of a validator being set on a control is:
     *
     * {
     *  control: 'informationNeeded',
     *  value: 'Information text',
     *  validators: ['minLength']
     * }
     *
     * TODO: Unit test.
     *
     * @param validators - ['minLength']
     * @return {boolean}
     */
    controlHasValidation(validators: Array<string>) {
        return validators && validators.length > 0;
    }
}
