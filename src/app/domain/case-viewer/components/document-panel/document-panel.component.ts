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
    private selectedDocument: string;

    constructor(private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit(): void {
        this.documents = this.panelData.fields[0].value.map(doc => {
            return {
                id: doc.id,
                name: doc.value.documentFileName,
                url: doc.value.documentLink.document_binary_url
            };
        });
        this.route.queryParamMap.subscribe(params => {
            if (params['doc_id']) {
                this.selectedDocument = this.documents.filter(doc => doc.id === params['doc_id'])[0];
            } else {
                this.router.navigate([`${this.documents[0].id}`]);
            }
        });
    }
}
