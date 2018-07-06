import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-timeline-section',
    templateUrl: './timeline-section.component.html',
    styleUrls: ['./timeline-section.component.scss']
})
export class TimelineSectionComponent {

    @Input() title: string;
    @Input() events;
    @Input() caseId;

    constructor() {}
}
