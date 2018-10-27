import {Component, ElementRef, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'app-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {
    @Input() group: FormGroup;
    @Input() idPrefix = 'waste';
    @Input() name = 'waste';
    @Input() items;
    @Input() classes;
    @Input() labelClasses;

    constructor() {
    }

}
