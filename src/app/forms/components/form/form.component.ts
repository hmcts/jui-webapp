import {Component, OnInit} from '@angular/core';
import {  ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FormService} from "../../services/form.service";

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

    @Input() formGroup: any;
    @Output() callback: EventEmitter<any> = new EventEmitter();
    @Input() callback_options;

    @HostListener('ngSubmit') listener(event) {
        // console.log('test obj', this.callback_options);
        this.submitListener();
    }

    constructor(private formService:FormService) {

    }

    ngOnInit() {
        console.log(this.callback_options);
        this.checkSubmission();
    }

    submitListener() {
        console.log('omg omg omg ', this.formGroup.value);
        this.triggerCallback(this.formGroup.value);
    }

    checkSubmission() {
        const values = this.formService.getFormValues();
        if(values && Object.keys(values).length > 0) {
            this.triggerCallback(values);
        }
    }

    triggerCallback(values) {
        // console.log('this.callback', this.callback)
        console.log('callback_options', this.callback_options);
        if(this.callback_options && this.callback_options.eventEmitter) {
            this.callback_options.eventEmitter.emit(values);
            console.log('emitted');

        }
    }

}
