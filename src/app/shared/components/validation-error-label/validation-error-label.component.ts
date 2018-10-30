import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'app-validation-error-label',
    templateUrl: './validation-error-label.component.html',
    styleUrls: ['./validation-error-label.component.scss']
})
/**
 * ValidationErrorLabelComponent
 *
 * If the control that this error message component links to is not valid we
 * show the Error Message, sent through from the parent component.
 */
export class ValidationErrorLabelComponent {
    @Input() group: FormGroup;
    @Input() idPrefix = 'ta';
    @Input() name = 'ta';
    @Input() linkToControl;

    constructor() {
    }

    /**
     * Checks if the control this error message links to is valid.
     *
     * ie. If the control that this error message links to is not valid we
     * show the Error Message.
     *
     * @param formGroup
     * @param linkToControl
     * @return {boolean}
     */
    isControlValid(formGroup: FormGroup, linkToControl: string): boolean {
        return formGroup.get(linkToControl).valid;
    }
}
