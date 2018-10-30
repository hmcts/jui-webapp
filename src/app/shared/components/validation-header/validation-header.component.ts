import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

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

    constructor() {
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
        console.log('formGroup');
        console.log(formGroup);
        console.log('linkToControl');
        console.log(linkToControl);
        return formGroup.get(linkToControl).valid;
    }
}
