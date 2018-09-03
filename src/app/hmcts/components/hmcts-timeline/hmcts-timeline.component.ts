import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-hmcts-timeline',
    templateUrl: './hmcts-timeline.component.html',
    styleUrls: ['./hmcts-timeline.component.scss']
})
export class HmctsTimelineComponent {

    @Input() events = [
        {
            title: 'Response submitted',
            by: 'DWP Appeals Officer',
            dateUtc: '2018-01-25T14:04',
            date: '25 Jan 2018',
            time: '14:04pm',
            documents: [{
                name: 'Statement of information',
                href: '#1'
            }, {
                name: 'Another document',
                href: '#2'
            }]
        },
        {
            title: 'Appeal marked as compliant',
            by: 'DJ DeVere',
            dateUtc: '2017-12-05T09:10',
            date: '5 Dec 2017',
            time: '9:10am'
        },
        {
            title: 'Interlocutory referral to DJ DeVere',
            by: 'DLC Admin',
            dateUtc: '2017-11-20T14:27',
            date: '20 Nov 2017',
            time: '14:27pm',
            documents: [{
                name: 'Statement of information',
                href: '#3'
            }]
        }
    ];

    constructor() { }

}
