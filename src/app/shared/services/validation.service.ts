import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Validators, ValidationErrors, ValidatorFn} from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class ValidationService {

    // FOR SINGLE CONTROLS - formGroup.control level validation
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
    isFormControlValid(formGroup: FormGroup, control: string): boolean {

        return formGroup.get(control).valid;
    }

    // FOR MULTIPLY CONTROLS - formGroup level validation.
    /**
     * Is Form Group Invalid
     *
     * Checks if a validation error has been thrown on the pages Angular FormGroup.
     *
     * FormGroup is the common ancestor of FormControls, and therefore and according to the Angular
     * Docs the best place to validate against multiply controls, that have dependencies upon one
     * another.
     *
     * An example being we should check if a user has checked one of eight checkboxes.
     *
     * TODO : Unit Test
     *
     * @see ValidationService
     * @param {FormGroup} formGroup
     * @param {string} validationErrorId - ie. 'reasonsConstentOrderNotApproved' - This is the validation identifier
     * we assign to a group of form controls, we assign this when we currently setValidators(), note that we will
     * need to pass this in once the Universal Form Builder is merged with Validation.
     * @return {boolean}
     */
    isFormGroupInvalid(formGroup: FormGroup, validationErrorId: string): boolean {

        if (formGroup.errors && formGroup.errors.hasOwnProperty(validationErrorId)) {
            return formGroup.errors[validationErrorId];
        } else {
            return null;
        }
    }

    /**
     * isAnyCheckboxChecked
     *
     * Checks if any of the checkbox controls passed to this function are checked ie. have a boolean value
     * of true.
     *
     * This is due to the fact that we might have multiply checkboxes within the view, and the user needs to
     * select at least one of these checkboxes to have entered a valid input.
     *
     * Note that we valid on the formGroup level, and not the control level for this as we are concerned with
     * multiply controls and the Angular 6 way is to have the validator on a common ancestor of controls, in this
     * case our formGroup.
     *
     * If this function returns null, there is no validation error.
     *
     * TODO : Can we return ValidationFn from this?
     *
     * If there the user has checked a checked box, this func, returns null, and therefore no validation error is returned,
     * as the user has checked a box, if it returns a validation error, the user has not checked any of the checkboxes.
     *
     * @param formGroup
     * @param {string} validationIdentifier - An error name assigned by the developer, this name can then be referred
     * to display the view.
     * @return {any}
     */
    isAnyCheckboxChecked(formGroup: FormGroup, checkboxes: Array<string>, validationIdentifier: string): ValidatorFn | null {

        const isAnyCheckboxCheckedValidationFn: ValidatorFn = (controls: FormGroup): ValidationErrors | null => {

            for (const checkbox of checkboxes) {
                if (controls.get(checkbox).value) {
                    return null;
                }
            }

            return {
                [validationIdentifier]: true,
            };
        };

        return isAnyCheckboxCheckedValidationFn;
    }
}
