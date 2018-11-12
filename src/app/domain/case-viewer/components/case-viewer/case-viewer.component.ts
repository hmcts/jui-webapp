import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PageDateDefault} from '../../../models/section_fields';
export interface Section {
    sections: Array<PageDateDefault>;
}
@Component({
    selector: 'app-case-viewer',
    templateUrl: './case-viewer.component.html',
    styleUrls: ['./case-viewer.component.scss']
})
export class CaseViewerComponent implements OnChanges {
    @Input() case: any;
    @Input() sectionId: string;

    public targetSection: Section;

    constructor() {}

    ngOnChanges(changes) {
        if (this.case) {
            this.targetSection = this.case.sections.find(section => {
                return section.id === this.sectionId;
            });
        }
    }
}
