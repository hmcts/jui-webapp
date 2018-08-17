import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-hmcts-progress-bar',
    templateUrl: './hmcts-progress-bar.component.html',
    styleUrls: ['./hmcts-progress-bar.component.scss']
})
export class HmctsProgressBarComponent implements OnInit {

    @Input() items = [{
        label: {
            text: 'You apply'
        },
        complete: true
    }, {
        label: {
            text: 'Your husband/wife responds'
        },
        complete: true
    }, {
        label: {
            text: 'The court decides'
        },
        active: true
    }, {
        label: {
            text: 'Divorce finalised'
        }
    }];

    constructor() { }

    ngOnInit() {
    }

}
