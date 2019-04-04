import {Component, OnInit} from '@angular/core';
import {HostListener, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormService} from '../../services/form.service';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

    @Input() formGroup: FormGroup;
    @Input() callback_options;

    form: FormGroup;

    @HostListener('ngSubmit') listener(event) {
        this.submitListener();
    }

    constructor(private formService: FormService) {

    }

    ngOnInit() {
        this.form = this.formGroup;
        this.checkSubmission();
    }

    submitListener() {
        this.triggerCallback(this.formGroup.value);
    }

    checkSubmission() {
        const values = this.formService.getFormValues();
        if (values) {
            const fields = Object.keys(values);
            fields.forEach(field => {
               this.form.controls[field].setValue(values[field]);
            });
            this.triggerCallback(values);
        }
    }

    triggerCallback(values) {
        if (this.callback_options && this.callback_options.eventEmitter) {
            this.callback_options.eventEmitter.emit(values);
        }
    }
}

