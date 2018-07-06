import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
    selector: 'app-case-viewer-container',
    templateUrl: './case-viewer-container.component.html',
    styleUrls: ['./case-viewer-container.component.scss']
})
export class CaseViewerContainerComponent implements OnChanges {

    @Input() caseId: any;
    @Input() case: any;
    @Input() sectionId: any;
    links = [];

    constructor() { }

    ngOnChanges(changes): void {
        if (this.case) {
            this.links = this.case.sections.map(section => {
                return {
                    href: `/viewcase/${this.caseId}/${section.id}`,
                    label: section.name,
                    id: section.id
                };
            });
        }
    }

}
