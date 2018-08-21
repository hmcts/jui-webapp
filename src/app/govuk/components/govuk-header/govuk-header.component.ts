import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-govuk-header',
    templateUrl: './govuk-header.component.html',
    styleUrls: ['./govuk-header.component.scss']
})
export class GovukHeaderComponent  {

    @Input() homepageUrl = '#';

    constructor() { }

}
