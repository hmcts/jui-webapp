import { Component, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'app-document-panel',
    templateUrl: './document-panel.component.html',
    styleUrls: ['./document-panel.component.scss']
})
export class DocumentPanelComponent implements OnChanges {
    @Input() panelData;
    @Input() documentId: string;
    @Input() documents;
    targetDocument;

    constructor() {
    }

    ngOnChanges(changes) {
        if (this.documents) {
            this.targetDocument = this.documents.filter(item => item.id === this.documentId);

        }
    }
}
