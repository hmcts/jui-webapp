import {Injectable} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ValidationService} from './validation.service';

@Injectable({
    providedIn: 'root'
})
export class FormsService {
    FormControls = [];

    constructor(private validationService: ValidationService) {
    }

    /**
     * Creation of FormControls for a FormGroup.
     * So first thing is how do we add Validation to a FormControl
     *
     * prop can be a fieldset, legend, text, idPrefix, name, header, checkboxes, if we
     *
     *
     * @param someJson
     * @param someData
     */
    create(someJson, someData) {
        if (typeof someJson === 'object') {

            for (const prop in someJson) {
                if (prop === 'control') {
                    if (someJson.radioGroup !== undefined) {

                        if (Object.keys(someData).length !== 0) {
                            for (const radioEl of someJson.radioGroup) {
                                if (radioEl.value === someData[someJson.control]) {
                                    this.FormControls[someJson.control] = new FormControl(radioEl.value);
                                    break;
                                } else {
                                    this.FormControls[someJson.control] = new FormControl();
                                }
                            }
                        } else {
                            this.FormControls[someJson.control] = new FormControl();
                        }

                    } else {
                        if (someData[someJson.control]) {

                            this.FormControls[someJson.control] = new FormControl(someData[someJson.control]);
                        } else {
                            this.createFormControl(someJson.control, someJson.value, someJson.validators);
                        }
                    }
                }
                this.create(someJson[prop], someData);
            }
        }
        if (someJson !== undefined && someJson.isArray) {
            console.log('someJson is something');
            for (const item  of someJson) {
                this.create(someJson[item], someData);
            }
        }
    }

    /**
     * Creates a new `FormControl` instance.
     * @param controlName - 'informationNeeded'
     * @param initialValue - ie. false / true if it's a checkbox, text if it's a textarea.
     */
    createFormControl(controlName: string, initialValue, validators: Array<string>) {

        if (this.validationService.controlHasValidation(validators)) {
            this.FormControls[controlName] = new FormControl(initialValue, this.validationService.getNgValidators(validators));
            return;
        }

        this.FormControls[controlName] = new FormControl(initialValue);
    }

    defineformControls(someJson: any, someData: any): any {
        console.log('Before= ', this.FormControls, someData);
        console.log(someJson, someData);
        this.create(someJson, someData);
        // So over here we have the components
        console.log('After= ', this.FormControls);
        return this.FormControls;
    }
}
