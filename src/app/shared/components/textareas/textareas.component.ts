import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'app-textareas',
    templateUrl: './textareas.component.html',
    styleUrls: ['./textareas.component.scss']
})
/**
 * TextareasComponent
 *
 * Features:
 * If this component is told to show it's validation, and the input the user has entered is invalid,
 * then we should display a red box around the text area.
 */
export class TextareasComponent {
    @Input() group: FormGroup;
    @Input() idPrefix = 'ta';
    @Input() name = 'ta';
    @Input() rows;
    @Input() classes;
    @Input() control;
    @Input() showValidation;

    constructor() {
    }

    /**
     * showValidationAndIsControlValid
     *
     * Return true if this component is required to show it's validation, and the users input is invalid.
     *
     * @param showValidation
     * @param formGroup
     * @param control
     * @return {boolean}
     */
    isControlInvalidAndShowValidation(formGroup: FormGroup, control: string, showValidation: boolean) {

        console.log('showValidation');
        console.log(showValidation);
        console.log(!this.isControlValid(formGroup, control) && showValidation);

        return !this.isControlValid(formGroup, control) && showValidation;
    }

    /**
     * Checks if this control is valid.
     *
     * TODO: Make DRY with validation-error-label component
     *
     * @param formGroup
     * @param linkToControl
     * @return {boolean}
     */
    isControlValid(formGroup: FormGroup, control: string): boolean {
        return formGroup.get(control).valid;
    }
}
