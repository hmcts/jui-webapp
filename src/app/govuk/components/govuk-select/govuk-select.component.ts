import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-govuk-select',
    templateUrl: './govuk-select.component.html',
    styleUrls: ['./govuk-select.component.scss']
})
export class GovukSelectComponent {

    @Input() id = 'sort';
    @Input() name = 'sort';
    @Input() label = {
        text: 'Sort by'
    };
    @Input() items = [
        {
            value: 'published',
            text: 'Recently published'
        },
        {
            value: 'updated',
            text: 'Recently updated',
            selected: true
        },
        {
            value: 'views',
            text: 'Most views'
        },
        {
            value: 'comments',
            text: 'Most comments'
        }
    ];

    constructor() { }

}
