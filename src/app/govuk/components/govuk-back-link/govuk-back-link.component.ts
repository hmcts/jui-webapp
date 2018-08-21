import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-govuk-back-link',
    templateUrl: './govuk-back-link.component.html',
    styleUrls: ['./govuk-back-link.component.scss']
})
export class GovukBackLinkComponent {

    @Input() text = 'Back';
    @Input() href = '#';

    constructor() { }

}
