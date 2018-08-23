import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-govuk-inset-text',
    templateUrl: './govuk-inset-text.component.html',
    styleUrls: ['./govuk-inset-text.component.scss']
})
export class GovukInsetTextComponent {

    @Input() text = 'It can take up to 8 weeks to register a lasting power of attorney if there are no mistakes in the application.';

    constructor() { }

}
