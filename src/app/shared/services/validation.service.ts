import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Validators} from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class ValidationService {

    /**
     * Custom validators can be added to this.
     *
     * TODO : Define interface for array.
     * TODO : Add a Custom Validator example.
     *
     * @see https://angular.io/guide/form-validation#custom-validators
     */
    ngValidatorFunctionMap: Array<any> = [
        {
            simpleName: 'required',
            ngValidatorFunction: Validators.required
        },
        {
            simpleName: 'email',
            ngValidatorFunction: Validators.email
        },
    ];

    constructor() {
    }

    /**
     * Returns a map of how we've mapped simple names to Ng Validators, and in the future custom validators.
     *
     * TODO: Check return in Unit test.
     *
     * @return Array
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
     * Note: Validators.minLength requires Validators.required
     *
     * TODO: Unit test.
     *
     * @see state_meta
     * @param validators - ie. ['required', 'email']
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
     *  validators: ['required']
     * }
     *
     * TODO: Unit test.
     *
     * @param {Array} validators - ['required']
     * @return {boolean}
     */
    controlHasValidation(validators: Array<string>): boolean {
        return validators && validators.length > 0;
    }

    /**
     * Checks if the control is valid.
     *
     * Returns a boolean, based on if the the control, which is part
     * of a form group is valid or not.
     *
     * TODO: Unit test.
     *
     * @param {FormGroup} formGroup
     * @param {String} control - 'informationNeeded'
     * @return {boolean}
     */
    isControlValid(formGroup: FormGroup, control: string): boolean {
        return formGroup.get(control).valid;
    }
}
