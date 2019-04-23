import {Component, Input} from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'app-hmcts-timeline',
    templateUrl: './hmcts-timeline.component.html',
    styleUrls: ['./hmcts-timeline.component.scss']
})
export class HmctsTimelineComponent {

    @Input() events;

    getLocalTime(e) {
        const date = moment.utc(e.dateUtc).format();
        return moment.utc(date).local().format('h:mma');
    }

}
