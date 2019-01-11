import {Component, Input} from '@angular/core';
import {Location} from '@angular/common';

@Component({
    selector: 'app-govuk-back-link',
    templateUrl: './govuk-back-link.component.html',
    styleUrls: ['./govuk-back-link.component.scss']
})
export class GovukBackLinkComponent {

    location: Location;
    @Input() text = 'Back';

    constructor(private _location: Location) {
        this.location = _location;
    }

    back() {
        this.location.back();
    }

}
