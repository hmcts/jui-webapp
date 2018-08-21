import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-govuk-button',
    templateUrl: './govuk-button.component.html',
    styleUrls: ['./govuk-button.component.scss']
})
export class GovukButtonComponent {

    @Input() text = 'Save and continue';

    constructor() { }

}
