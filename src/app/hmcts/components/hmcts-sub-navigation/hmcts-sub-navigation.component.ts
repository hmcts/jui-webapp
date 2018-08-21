import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-hmcts-sub-navigation',
    templateUrl: './hmcts-sub-navigation.component.html',
    styleUrls: ['./hmcts-sub-navigation.component.scss']
})
export class HmctsSubNavigationComponent {

    @Input() label = 'Sub navigation';
    @Input() items = [
        {
            text: 'Nav item 1',
            href: '#1',
            active: true
        }, {
            text: 'Nav item 2',
            href: '#2'
        }, {
            text: 'Nav item 3',
            href: '#3'
        }
    ];

    constructor() { }

}
