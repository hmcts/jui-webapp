import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-document-panel',
    templateUrl: './document-panel.component.html',
    styleUrls: ['./document-panel.component.scss']
})
export class DocumentPanelComponent implements OnInit {
    @Input() panelData;
    documents: any[];
    selectedDocument: string;

    constructor(private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit(): void {
        if (this.panelData.fields[0].value) {
            this.documents = this.panelData.fields[0].value.map(doc => {
                return {
                    id: doc.id,
                    name: doc.value.documentFileName || doc.value.documentLink.document_filename,
                    url: doc.value.documentLink.document_url
                };
            });
            const params = this.route.snapshot.params;
            if (params['section_item_id']) {
                    this.selectedDocument = this.documents.filter(doc => doc.id === params['section_item_id'])[0];
                } else {
                    this.router.navigate([`${this.documents[0].id}`], {relativeTo: this.route});
                }
        }
    }
}
