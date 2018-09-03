import {Component, Input} from '@angular/core';
import {Location} from '@angular/common';

@Component({
    selector: 'app-govuk-back-link',
    templateUrl: './govuk-back-link.component.html',
    styleUrls: ['./govuk-back-link.component.scss']
})
export class GovukBackLinkComponent {

    @Input() text = 'Back';
    @Input() href = '#';

    constructor() { }

    // constructor(private location: Location) {}

    // back() {
    //     this.location.back();
    // }

}
