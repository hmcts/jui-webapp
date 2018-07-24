import { Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';
import {FormService} from "../services/form.service";

@Directive({
  selector: '[universalForm]'
})
export class UniversalFormDirective {

    @Input('universalForm') callback_options: any;
    @Output() callback: EventEmitter<any> = new EventEmitter();
    @Input() formGroup: any;
    @Input() test: any;

    callback2:any;

    formService;

    @HostListener('ngSubmit') listener(event) {
        console.log('test obj', this.callback_options);
        this.submitListener();
    }

    constructor(el: ElementRef, formService:FormService) {
        this.formService = formService;
        el.nativeElement.style.backgroundColor = 'yellow';
        el.nativeElement.method = "post";
        el.nativeElement.action = "";

        // this.callback.subscribe(data => {
        //     console.log('waaaaaaaaa?', data)
        // });

        this.checkSubmission();
    }

    submitListener() {
        // console.log('omg omg omg ', this.formGroup.value);
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
        // if(this.callback_options && this.callback_options.eventEmitter) {
        //     this.callback_options.eventEmitter.emit(values);
        //     console.log('emitted');
        //
        // }
    }

}
