import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-govuk-error-summary',
    templateUrl: './govuk-error-summary.component.html',
    styleUrls: ['./govuk-error-summary.component.scss']
})
export class GovukErrorSummaryComponent {

    @Input() titleText = 'There is a problem';
    @Input() errorList = [
        {
            text: 'Date of birth must be in the past',
            href: '#dob-error'
        },
        {
            text: 'Enter a postcode, like AA1 1AA',
            href: '#postcode-error'
        }
    ];

    constructor() { }

}
