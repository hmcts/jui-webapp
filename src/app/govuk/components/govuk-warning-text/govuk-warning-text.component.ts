import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-govuk-warning-text',
    templateUrl: './govuk-warning-text.component.html',
    styleUrls: ['./govuk-warning-text.component.scss']
})
export class GovukWarningTextComponent {

    @Input() text = 'You can be fined up to £5,000 if you don’t register.';
    @Input() iconFallbackText = 'Warning';

    constructor() { }

}
