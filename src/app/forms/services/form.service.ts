import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class FormService {

    constructor() {

    }
    getFormValues() {
        console.log('client service');
        return {};
    }


}
