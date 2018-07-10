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
    links = [];

    targetSection;

    constructor() {}

    ngOnChanges(changes) {
        if (this.case) {
            this.links = this.case.sections.map(section => {
                return {
                    href: `/${section.id}`,
                    label: section.name,
                    id: section.id
                };
            });

            this.targetSection = this.case.sections.find(section => {
                return section.id === this.sectionId;
            });
        }
    }
}
