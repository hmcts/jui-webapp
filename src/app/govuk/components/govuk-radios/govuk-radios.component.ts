import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-govuk-radios',
    templateUrl: './govuk-radios.component.html',
    styleUrls: ['./govuk-radios.component.scss']
})
export class GovukRadiosComponent {

    @Input() idPrefix = 'changed-name';
    @Input() name = 'changed-name';
    @Input() classes = 'govuk-radios--inline';
    @Input() fieldset = {
        legend: {
            text: 'Have you changed your name?',
            isPageHeading: true,
            classes: 'govuk-fieldset__legend--xl'
        }
    };
    @Input() hint = {
        text: 'This includes changing your last name or spelling your name differently.'
    };
    @Input() items = [
        {
            value: 'yes',
            text: 'Yes'
        },
        {
            value: 'no',
            text: 'No'
        }
    ];

    constructor() { }

}
