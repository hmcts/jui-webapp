import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-case-viewer',
    templateUrl: './case-viewer.component.html',
    styleUrls: ['./case-viewer.component.scss']
})
export class CaseViewerComponent implements OnChanges {
    @Input() case: any;
    @Input() sectionId: string;

    targetSection;

    constructor() {
    }

    ngOnChanges(changes) {
        if (this.case) {
            this.targetSection = this.case.sections.find(section => {
                return section.id === this.sectionId;
            });
        }
    }
}
