import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-govuk-phase-banner',
    templateUrl: './govuk-phase-banner.component.html',
    styleUrls: ['./govuk-phase-banner.component.scss']
})
export class GovukPhaseBannerComponent {

    @Input() tag = {
        text: 'alpha'
    };
    @Input() html = 'This is a new service – your <a class="govuk-link" href="#">feedback</a> will help us to improve it.';

    constructor() { }

}
