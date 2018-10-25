import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormsService {
    FormControls = [];
    constructor() { }
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
        console.log('someJson');
        console.log(someJson);
        console.log('someData');
        console.log(someData);
        if (typeof someJson === 'object') {

            for (const prop in someJson) {

                console.log('Prop');
                console.log(prop);

                if (prop === 'control') {
                    // Handles radioGroup
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

                        console.log('Not a radioGroup');
                        // If it is a control, so it must get into this.
                        if (someData[someJson.control]) {

                            console.log('Creates a FormControl with the following:');
                            console.log(someData[someJson.control]);

                            this.FormControls[someJson.control] = new FormControl(someData[someJson.control]);
                        } else {
                            // So it gets into this.
                            console.log('Creates a FormControl with the value:');
                            console.log(someJson.control);
                            console.log(someJson.text);
                            console.log(someJson.value);
                            console.log(someJson.validation);
                            this.FormControls[someJson.control] = new FormControl(someJson.value, Validators.required);
                        }
                    }
                }
                this.create(someJson[prop], someData);
            }
        }
        // So doesn't get into this for partiesAttending
        if (someJson !== undefined && someJson.isArray) {
            console.log('someJson is something');
            for (const item  of someJson) {
                this.create(someJson[item], someData);
            }
        }
    }
    defineformControls(someJson: any, someData: any): any {
        console.log('Before= ',this.FormControls, someData);
        console.log(someJson, someData);
        this.create(someJson, someData);
        // So over here we have the components
        console.log('After= ',this.FormControls);
        return this.FormControls;
    }
}
