import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-govuk-details',
    templateUrl: './govuk-details.component.html',
    styleUrls: ['./govuk-details.component.scss']
})
export class GovukDetailsComponent {

    @Input() summaryText = 'Help with nationality';
    @Input() text = 'We need to know your nationality so we can work out which elections you’re entitled to vote in.' +
        ' If you can’t provide your nationality, you’ll have to send copies of identity documents through the post.';


    constructor() { }


}
