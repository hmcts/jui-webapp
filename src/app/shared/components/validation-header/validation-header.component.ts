import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ValidationService} from '../../services/validation.service';

@Component({
    selector: 'app-validation-header',
    templateUrl: './validation-header.component.html',
    styleUrls: ['./validation-header.component.scss']
})
/**
 * ValidationHeaderComponent
 *
 * If the control that this error message component links to is not valid we
 * show the Error Message, sent through from the parent component.
 */
export class ValidationHeaderComponent {
    @Input() formGroup: FormGroup;
    @Input() linkToControl;

    // TODO : deprecate as not needed?
    @Input() idPrefix = 'ta';
    @Input() name = 'ta';

    // TODO : Move to constants file.
    FORM_CONTROL = 'formControl';
    FORM_GROUP = 'formGroup';

    /**
     * Signature for validationHeaderControls to be used in a Unit Test is:
     *
     * [{
     *  value: 'Enter what information is needed',
     *  linkToControl: 'informationNeeded',
     *  pageLink: '#linkToTextArea'
     * },
     * {
     *  value: 'Select yes if you want to include an annotated version of the draft consent order',
     *  linkToControl: 'includeAnnotatedVersionDraftConsOrder',
     *  pageLink: '#linkToRadiobuttons'
     *}];
     */
    @Input() validationHeaderErrorMessages;

    constructor(private validationService: ValidationService) {
    }

    /**
     * Checks if this control is valid.
     *
     * @see ValidationService
     * @param control - 'informationNeeded'
     */
    isControlValid(formGroup: FormGroup, control: string): boolean {
        return this.validationService.isControlValid(formGroup, control);
    }

    // TODO: Make DRY
    isValidationError(formGroup: FormGroup, validationErrorId: string): boolean {

        if (formGroup.errors && formGroup.errors.hasOwnProperty(validationErrorId)) {
            return formGroup.errors[validationErrorId];
        } else {
            return null;
        }
    }

    /**
     * Checks if we should show a validation message for a form control, or the
     * form group.
     *
     * @param {string} validationLevel - validation level can either be formGroup or formControl.
     * A formGroup level is validation that handles multiply form controls, when validating multiply components
     * at the same time, ie. when you wish to see if a checkbox is checked, from multiply checkboxes, you must
     * check this on a common ancestor of a set of controls. This common ancestor is always the Angular FormGroup.
     * formControl level is validation that handles a single form control.
     *
     * This abstration was based on how Angular 6's FormGroup and FormControl are abstract from each other,
     * after reading.
     *
     * @param linkToControl
     * @return {boolean}
     */
    isValidationLevel(validationLevel: string, level: string): boolean {
        return validationLevel === level;
    }
}
