import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-textarea',
    templateUrl: './textarea.component.html',
    styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent {

    @Input() id: string;
    @Input() label: string;
    @Input() rows: string;
    @Input() errorMessage: string;
    @Input() error: boolean;
    @Input() disable: boolean;
    @Input() text = '';
    @Input() formGroup;

    @Input()  richTextMode: boolean;

    constructor() { }
}
