import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {ConfigService} from '../../../../config.service';
import {ViewerFactoryService} from '../../../../shared/components/document-viewer/viewers/viewer-factory.service';
import {AnnotationService} from '../../../services/annotation.service';

@Component({
    selector: 'app-document-panel',
    templateUrl: './document-panel.component.html',
    styleUrls: ['./document-panel.component.scss']
})
export class DocumentPanelComponent implements OnInit {

    @Input() panelData;
    @Input() case: any;
    documents: any[] = [];
    selectedDocument: any;
    documentUrl: string;
    commentsForm: FormGroup;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private configService: ConfigService,
                private annotationService: AnnotationService,
                private viewerFactoryService: ViewerFactoryService) {
        this.documentUrl = `${configService.config.api_base_url}/api`;
    }

    getDocuments() {
        let docIds = [];

        if (this.panelData.fields) {
            docIds = this.panelData.fields
                .map(f => f.value)
                .reduce((a, b) => (a || []).concat(b))
                .filter(x => !!x)
                .map(x => x.id);
        }

        let documents = this.case.documents
            .filter(document => {
                const splitURL = document._links.self.href.split('/');
                const id = splitURL[splitURL.length - 1];
                return docIds.indexOf(id) > -1;
            });

        documents.sort((a, b) => {
            const dateA = new Date(a.createdOn);
            const dateB = new Date(b.createdOn);
            return dateA < dateB;
        });

        documents = documents.map(doc => {
            return {
                id: doc.id,
                name: doc.originalDocumentName,
                url: doc._links.self.href
            };
        });

        this.documents = documents;
    }

    saveAnnotations(commentIndex: number): void {
        const value = (<FormArray>this.commentsForm.get('comments')).at(commentIndex).value;

        alert(`save value ${value} for page ${commentIndex + 1} to doc:${this.selectedDocument.url}`);
    }

    ngOnInit(): void {
        this.getDocuments();
        this.commentsForm = new FormGroup({
            'comments': new FormArray([])
        });
        this.viewerFactoryService.afterLoadComplete.subscribe(( e => {
            var arrayOfControls = new Array<FormControl>(e.numPages);
            for (var i=0; i<e.numPages; i++) {
                arrayOfControls[i] = new FormControl(null, null);
            }
            this.commentsForm.setControl('comments', new FormArray(arrayOfControls));
            this.annotationService
                .fetch(this.selectedDocument.url)
                .subscribe(data => { alert(data); });
        }).bind(this));
        if (this.documents.length) {
            this.route.params.subscribe(params => {
                if (params['section_item_id']) {
                    this.selectedDocument = this.documents.filter(doc => doc.id === params['section_item_id'])[0];
                } else {
                    this.router.navigate([`${this.documents[0].id}`], {relativeTo: this.route});
                }
            });
        }
    }
}



