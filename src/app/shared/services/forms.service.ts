import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormsService {
    FormControls = [];
    constructor() { }
    create(someJson, someData) {
        if (typeof someJson === 'object') {
            for (const prop in someJson) {
                if (prop === 'control') {
                    if (someJson.radioGroup !== undefined) {

                        console.log("Trace1", someJson.radioGroup);

                        if (Object.keys(someData).length !== 0) {
                            console.log("Trace2", someData, );

                            for (const radioEl of someJson.radioGroup) {
                                if (radioEl.value === someData[someJson.control]) {
                                    console.log("Trace3", radioEl.value, someData[someJson.control]);
                                    this.FormControls[someJson.control] = new FormControl(radioEl.value);
                                } else {
                                    this.FormControls[someJson.control] = new FormControl();
                                }
                            }
                        } else {
                            console.log("Trace4", someJson.control);

                            this.FormControls[someJson.control] = new FormControl();
                        }
                    } else {
                        this.FormControls[someJson.control] = new FormControl(someJson.value);
                    }
                }
                this.create(someJson[prop], someData);
            }
        }
        if (someJson !== undefined && someJson.isArray) {
            for (const item  of someJson) {
                this.create(someJson[item], someData);
            }
        }
    }
    defineformControls(someJson: any, someData: any): any {
        console.log('Before= ',this.FormControls, someData);
        console.log(someJson, someData);
        this.create(someJson, someData);
        console.log('After= ',this.FormControls);

        return this.FormControls;
    }
}
