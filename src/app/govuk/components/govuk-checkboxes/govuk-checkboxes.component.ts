import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-govuk-checkboxes',
    templateUrl: './govuk-checkboxes.component.html',
    styleUrls: ['./govuk-checkboxes.component.scss']
})
export class GovukCheckboxesComponent {

    @Input() idPrefix = 'waste';
    @Input() name = 'waste';
    @Input() fieldset = {
        legend: {
            text: 'Which types of waste do you transport?',
            isPageHeading: true,
            classes: 'govuk-fieldset__legend--xl'
        }
    };
    @Input() hint = {
        text: 'Select all that apply.'
    };
    @Input() items = [
        {
            value: 'carcasses',
            text: 'Waste from animal carcasses'
        },
        {
            value: 'mines',
            text: 'Waste from mines or quarries'
        },
        {
            value: 'farm',
            text: 'Farm or agricultural waste'
        }
    ];

    constructor() { }

}
