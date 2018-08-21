import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-govuk-textarea',
    templateUrl: './govuk-textarea.component.html',
    styleUrls: ['./govuk-textarea.component.scss']
})
export class GovukTextareaComponent {

    @Input() id = 'more-detail';
    @Input() name = 'more-detail';
    @Input() label = {
        text: 'Can you provide more detail?'
    };
    @Input() hint = {
        text: 'Don’t include personal or financial information, eg your National Insurance number or credit card details.'
    };

    constructor() { }

}
