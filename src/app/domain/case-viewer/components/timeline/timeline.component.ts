import {Component, Input, OnChanges} from '@angular/core';

@Component({
    selector: 'app-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnChanges{
    @Input() events;
    @Input() maxHistory: number;

    ngOnChanges(changes): void {
        if (this.maxHistory) {
            if (this.events.length > this.maxHistory) {
                this.events = this.events.slice(0, this.maxHistory);
            }
        }
    }
}
