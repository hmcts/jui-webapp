import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-govuk-tag',
    templateUrl: './govuk-tag.component.html',
    styleUrls: ['./govuk-tag.component.scss']
})
export class GovukTagComponent {

    @Input() text = 'alpha';

    constructor() { }

}
