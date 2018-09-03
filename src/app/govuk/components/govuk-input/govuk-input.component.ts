import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-govuk-input',
    templateUrl: './govuk-input.component.html',
    styleUrls: ['./govuk-input.component.scss']
})
export class GovukInputComponent {

    @Input() id = 'email';
    @Input() name = 'email';
    @Input() hint = {
        text: 'We’ll only use this to send you a receipt'
    };
    @Input() label = {
        text: 'Email address'
    };

    constructor() { }

}
