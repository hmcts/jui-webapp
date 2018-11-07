import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ValidationService} from '../../services/validation.service';
import {ObjectService} from '../../services/object.service';

@Component({
    selector: 'app-validation-error-formgroup',
    templateUrl: './validation-error-formgroup.component.html',
    styleUrls: ['./validation-error-formgroup.component.scss']
})
/**
 * Validation Error Formgroup Component
 *
 * If the control that this error message component links to is not valid we
 * show the Error Message, sent through from the parent component.
 *
 * Note that this is validation for the formgroup level of components, ie.
 * a FormGroup contains (is parent) of FormControls.
 *
 * We need to have validation on this level, as we should be able to check if
 * one of a group of FormControls is checked. Those FormControls belonging to
 * the parent FormGroup.
 *
 * This is as per the Angular 6 guidelines/docs
 *
 * @see https://angular.io/guide/form-validation#adding-to-reactive-forms-1
 */
export class ValidationErrorFormGroupComponent {
    @Input() group: FormGroup;
    @Input() validationErrorId;

    constructor(private validationService: ValidationService) {
    }

    /**
     * Is Validation Error
     *
     * Checks if there is a validation error with the formGroup.
     */
    isFormGroupInvalid(formGroup: FormGroup, validationErrorId: string): boolean {
        return this.validationService.isFormGroupInvalid(formGroup, validationErrorId);
    }
}
