import {Component, Input, OnChanges} from '@angular/core';

@Component({
    selector: 'app-case-viewer',
    templateUrl: './case-viewer.component.html',
    styleUrls: ['./case-viewer.component.scss']
})
export class CaseViewerComponent implements OnChanges {

    @Input() case: any;
    @Input() caseId: any;
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
