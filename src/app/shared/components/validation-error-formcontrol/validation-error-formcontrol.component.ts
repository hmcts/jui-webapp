import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ValidationService} from '../../services/validation.service';

@Component({
    selector: 'app-validation-error-formcontrol',
    templateUrl: './validation-error-formcontrol.component.html',
    styleUrls: ['./validation-error-formcontrol.component.scss']
})
/**
 * ValidationErrorLabelComponent
 *
 * If the control that this error message component links to is not valid we
 * show the Error Message, sent through from the parent component.
 */
export class ValidationErrorFormControlComponent {
    @Input() group: FormGroup;
    @Input() idPrefix = 'ta';
    @Input() name = 'ta';
    @Input() controlId;

    constructor(private validationService: ValidationService) {
    }

    /**
     * Checks if the control this error message links to is valid.
     *
     * ie. If the control that this error message links to is not valid we
     * show the Error Message.
     *
     * @param formGroup
     * @param controlId
     * @return {boolean}
     */
    isFormControlValid(formGroup: FormGroup, controlId: string): boolean {
        return this.validationService.isFormControlValid(formGroup, controlId);
    }
}
