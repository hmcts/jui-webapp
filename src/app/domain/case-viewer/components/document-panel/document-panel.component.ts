import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfigService} from '../../../../config.service';

@Component({
    selector: 'app-document-panel',
    templateUrl: './document-panel.component.html',
    styleUrls: ['./document-panel.component.scss']
})
export class DocumentPanelComponent implements OnInit {

    @Input() panelData;
    @Input() case: any;
    documents: any[];
    selectedDocument: string;
    documentUrl: string;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private configService: ConfigService) {
        this.documentUrl = `${configService.config.api_base_url}/api`;
    }

    getDocuments() {
        let docIds = [];
        if (this.panelData.fields[0].value) {
            docIds = this.panelData.fields[0].value
                .map(doc => doc.id);
        }

        let documents = this.case.documents.filter(document => {
            const splitURL = document._links.self.href.split('/');
            const id = splitURL[splitURL.length-1];
            return docIds.indexOf(id) > -1;
        });
        documents.sort((a,b) => {
            const dateA = new Date(a.createdOn);
            const dateB = new Date(b.createdOn);
            return dateA < dateB;
        });
        console.log(documents);
        documents = documents.map(doc => {
            return {
                id: doc.id,
                name: doc.originalDocumentName,
                url: doc._links.self.href
            };
        });
        this.documents = documents;
    }


    ngOnInit(): void {
        this.getDocuments();

        if (this.documents.length) {
            this.route.params.subscribe(params => {
                if (params['section_item_id']) {
                    this.selectedDocument = this.documents.filter(doc => doc.id === params['section_item_id'])[0];
                } else {
                    this.router.navigate([`${this.documents[0].id}`], {relativeTo: this.route});
                }
            });
        }


        // if (this.panelData.fields[0].value) {
        //     const docIds = this.panelData.fields[0].value.filter(doc => doc.value.documentLink);
        //     console.log(docIds);
        //     console.log(this.case.documents);
            // this.documents = this.panelData.fields[0].value
            //     .filter(doc => doc.value.documentLink)
            //     .map(doc => {
            //         return {
            //             id: doc.id,
            //             name: doc.value.documentFileName || doc.value.documentLink.document_filename,
            //             url: doc.value.documentLink.document_url
            //         };
            //     });
            // if (this.documents.length) {
            //     this.route.params.subscribe(params => {
            //         if (params['section_item_id']) {
            //             this.selectedDocument = this.documents.filter(doc => doc.id === params['section_item_id'])[0];
            //         } else {
            //             this.router.navigate([`${this.documents[0].id}`], {relativeTo: this.route});
            //         }
            //     });
            // }
        // }
    }
}
