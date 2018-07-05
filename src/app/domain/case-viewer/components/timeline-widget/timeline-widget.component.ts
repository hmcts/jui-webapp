import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-timeline-widget',
    templateUrl: './timeline-widget.component.html',
    styleUrls: ['./timeline-widget.component.scss']
})
export class TimelineWidgetComponent {
    @Input() events;
}
