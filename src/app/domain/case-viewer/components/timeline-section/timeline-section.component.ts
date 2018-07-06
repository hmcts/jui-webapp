import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-timeline-section',
    templateUrl: './timeline-section.component.html',
    styleUrls: ['./timeline-section.component.scss']
})
export class TimelineSectionComponent{
    @Input() events;
    @Input() caseId;

    constructor(private router: Router) {
    }


    goToTimeline() {
        this.router.navigate(['viewcase', this.caseId, 'timeline']);
    }
}
