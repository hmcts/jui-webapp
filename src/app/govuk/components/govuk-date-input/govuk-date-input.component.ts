import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-govuk-date-input',
    templateUrl: './govuk-date-input.component.html',
    styleUrls: ['./govuk-date-input.component.scss']
})
export class GovukDateInputComponent {


    @Input() id = 'dob';
    @Input() name = 'dob';
    @Input() fieldset = {
        legend: {
            text: 'What is your date of birth?',
            isPageHeading: true,
            classes: 'govuk-fieldset__legend--xl'
        }
    };
    @Input() hint = {
        text: 'For example, 31 3 1980'
    };
    @Input() items = [
        {
            name: 'day'
        },
        {
            name: 'month'
        },
        {
            name: 'year'
        }
    ];

    constructor() { }

}
