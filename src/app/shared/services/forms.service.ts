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
                            this.FormControls[someJson.control] = new FormControl(someJson.value);
                        }
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
