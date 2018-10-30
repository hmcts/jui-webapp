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
    @Input() controlValidations = [
        {
            value: 'Enter what information is needed',
            linkToControl: 'informationNeeded',
            pageLink: '#linkToTextArea'
        },
        {
            value: 'Select yes if you want to include an annotated version of the draft consent order',
            linkToControl: 'includeAnnotatedVersionDraftConsOrder',
            pageLink: '#linkToRadiobuttons'
        }
    ];

    constructor(private validationService: ValidationService) {
    }

    /**
     * Is Control Valid
     *
     * @see validationService
     * @param formGroup
     * @param linkToControl - 'informationNeeded'
     * @return {boolean}
     */
    isControlValid(formGroup: FormGroup, linkToControl: string): boolean {
        return this.validationService.isControlValid(formGroup, linkToControl);
    }
}
