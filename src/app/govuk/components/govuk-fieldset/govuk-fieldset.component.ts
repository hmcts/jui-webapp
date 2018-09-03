import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-govuk-fieldset',
    templateUrl: './govuk-fieldset.component.html',
    styleUrls: ['./govuk-fieldset.component.scss']
})
export class GovukFieldsetComponent {

    @Input() legend = {
        text: 'Legend text goes here',
        classes: 'govuk-fieldset__legend--xl',
        isPageHeading: true
    };

    constructor() { }

}
