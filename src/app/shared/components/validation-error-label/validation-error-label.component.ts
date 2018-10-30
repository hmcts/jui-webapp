import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ValidationService} from '../../services/validation.service';

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

    constructor(private validationService: ValidationService) {
    }

    /**
     * Checks if the control this error message links to is valid.
     *
     * ie. If the control that this error message links to is not valid we
     * show the Error Message.
     *
     * TODO: Make DRY with textareas.component.ts
     *
     * @param formGroup
     * @param linkToControl
     * @return {boolean}
     */
    isControlValid(formGroup: FormGroup, linkToControl: string): boolean {
        return this.validationService.isControlValid(formGroup, linkToControl);
    }
}
