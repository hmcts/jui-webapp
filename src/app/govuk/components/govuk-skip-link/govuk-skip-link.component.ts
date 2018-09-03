import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-govuk-skip-link',
    templateUrl: './govuk-skip-link.component.html',
    styleUrls: ['./govuk-skip-link.component.scss']
})
export class GovukSkipLinkComponent {

    @Input() text = 'Skip to main content';
    @Input() href = '#content';

    constructor() { }

}
