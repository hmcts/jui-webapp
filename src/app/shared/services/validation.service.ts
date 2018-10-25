import {Injectable} from '@angular/core';
import {Validators} from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class ValidationService {

    validatorMap = [
        {
            validatorName: 'required',
            function: Validators.required
        }
    ];

    constructor() {
    }
    /**
     * Takes in an array of strings, that are used to construct the Angular Validators.
     *
     * This leverages the power of custom validators in Angular ie. we can write a reusable validators, map it
     * to a string, and pass the string into this within the array to use that custom validator, that we would
     * of previously created.
     *
     * Note: Validators.minLength requires Validators.required,
     *
     * @param validators - ['required']
     */
    createValidators(validators: Array<string>) {

        console.log('in createValidators');
        console.log(validators);

        validators.map(validatorAsString)


        return [
            Validators.required,
        ];
    }

    /**
     * Checks if validators have been set on the control, an example of a validator being set on a control is:
     * {
     *  control: 'informationNeeded',
     *  value: 'Information text',
     *  validators: ['minLength']
     * }
     * @param validators - ['minLength']
     * @return {boolean}
     */
    controlHasValidation(validators: Array<string>) {
        return validators && validators.length > 0;
    }
}
