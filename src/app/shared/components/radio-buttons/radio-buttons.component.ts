import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OnChanges} from '@angular/core';

@Component({
    selector: 'app-radio-buttons',
    templateUrl: './radio-buttons.component.html',
    styleUrls: ['./radio-buttons.component.scss']
})
export class RadioButtonsComponent {

    @Input() id: any;
    @Input() title: any;
    @Input() options: any;
    @Input() errorMessage: string;
    @Input() error: boolean;
    @Input() disable: boolean;
    @Input() formGroup;
    @Input() value;

    constructor() {}
}
