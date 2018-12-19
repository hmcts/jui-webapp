import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-hmcts-timeline',
    templateUrl: './hmcts-timeline.component.html',
    styleUrls: ['./hmcts-timeline.component.scss']
})
export class HmctsTimelineComponent {

    @Input() events;

    constructor() {}

}
