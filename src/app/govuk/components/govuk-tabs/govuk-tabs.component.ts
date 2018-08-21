import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-govuk-tabs',
    templateUrl: './govuk-tabs.component.html',
    styleUrls: ['./govuk-tabs.component.scss']
})
export class GovukTabsComponent {
    // https://github.com/alphagov/govuk-frontend/tree/master/package/components/tabs

    @Input() contents = 'Contents';
    @Input() items = [
        {
            label: 'Past day',
            id: 'past-day',
            panel: {
                html: `<app-govuk-table></app-govuk-table>`
            }
        },
        {
            label: 'Past week',
            id: 'past-week',
            panel: {
                html: 'BOB'
            }
        },
        {
            label: 'Past month',
            id: 'past-month',
            panel: {
                // html: pastMonthHtml
            }
        },
        {
            label: 'Past year',
            id: 'past-year',
            panel: {
                // html: pastYearHtml
            }
        }
    ];

    constructor() { }

}
