import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-govuk-panel',
    templateUrl: './govuk-panel.component.html',
    styleUrls: ['./govuk-panel.component.scss']
})
export class GovukPanelComponent {

    @Input() headingLevel = 1;
    @Input() titleText =  'Application complete';
    @Input() html = 'Your reference number<br><strong>HDJ2123F</strong>';

    constructor() { }

}
