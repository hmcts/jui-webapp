import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-hmcts-details-bar',
    templateUrl: './hmcts-details-bar.component.html',
    styleUrls: ['./hmcts-details-bar.component.scss']
})
export class HmctsDetailsBarComponent implements OnInit {

    @Input() reference = 'FR1231612322';
    @Input() title = { html: '<b>John Smith</b> v <b>Jane Smith</b>' };
    @Input() items = [
        {
            text: 'Make a decision'
        },
        {
            classes: 'hmcts-button--secondary',
            text: 'List for hearing'
        }
    ];

    constructor() { }

    ngOnInit() {
    }

}
