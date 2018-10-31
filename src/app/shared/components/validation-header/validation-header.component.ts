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
    @Input() group: FormGroup;
    @Input() idPrefix = 'ta';
    @Input() name = 'ta';
    @Input() linkToControl;

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
    @Input() validationHeaderControls;

    constructor(private validationService: ValidationService) {
    }

    /**
     * Checks if this control is valid.
     *
     * @see ValidationService
     */
    isControlValid(formGroup: FormGroup, linkToControl: string): boolean {
        return this.validationService.isControlValid(formGroup, linkToControl);
    }
}
