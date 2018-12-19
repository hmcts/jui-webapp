import {Component, Input, OnInit} from '@angular/core';
import {DocumentStoreService} from '../../services/documentStore/document-store.service';

@Component({
    selector: 'app-document-list',
    templateUrl: './document-list.component.html',
    styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit {


    @Input() page: number;
    @Input() sortby: string;
    @Input() order: string;
    @Input() size: number;
    documents: string;
    error: string;
    dmPage: any;

    table = {
        head: [
            { text: '' },
            { text: 'File Name' },
            { text: 'Created By' },
            { text: 'Created On' },
            { text: '' },
            { text: '' },
            { text: '' },
            { text: '' },
            { text: '' }
        ],
        rows: [
            [{}]
        ]
    };


    constructor(private documentStoreService: DocumentStoreService) { }

    ngOnInit() {
        this.refresh();
    }

    refresh() {
        this.documentStoreService.getCreatorDocuments(this.page, this.sortby, this.order, this.size)
            .subscribe(
                resp => {
                    if (resp.page) { this.dmPage = resp.page; }
                    if (resp && resp._embedded && resp._embedded.documents) {
                        this.documents = resp._embedded.documents; // eventually remove
                        this.table.rows = resp._embedded.documents.map(doc => ([
                            {
                                type: 'image',
                                text: `${doc.originalDocumentName}`,
                                href: `${this.convertUrlToProxy(doc._links.thumbnail.href)}`,
                                src: `${this.convertUrlToProxy(doc._links.thumbnail.href)}`
                            },
                            {
                                type: 'text',
                                text: doc.originalDocumentName
                            },
                            {
                                type: 'text',
                                text: doc.createdBy
                            },
                            {
                                type: 'text',
                                text: doc._modifiedOn
                            },
                            {
                                type: 'hyperlink',
                                text: `Download`,
                                href:   `${this.convertUrlToProxy(doc._links.binary.href)}`,
                                download: `${doc.originalDocumentName}`
                            },
                            {
                                type: 'hyperlink',
                                text: `View`,
                                href: `/viewer?url=${doc._links.self.href}`,
                            },
                            {
                                type: 'hyperlink',
                                text: `Annotate`,
                                href: `/viewer?url=${doc._links.self.href}&annotate=true`
                            },
                            {
                                type: 'button',
                                text: `Delete`,
                                click: `deleteDocument(${this.convertUrlToProxy(doc._links.self.href + '?permanent=true')})`
                            },
                        ]));
                    } else {
                        this.documents = null;
                        this.error = 'No Documents Found, Try Uploading a File.';
                    }
                },
                err => {
                    this.error = err;
                });
    }

    convertUrlToProxy(url: string): string {
        return this.documentStoreService.convertUrlToProxy(url);
    }

    deleteDocument(url: string) {
        this.documentStoreService.deleteDocument(url).subscribe(() => this.refresh());
    }

    get getCurrentPage(): number {
        return this.dmPage.number + 1;
    }

    get getTotalPage(): number {
        return (this.dmPage.totalPages < 1) ? 1 : this.dmPage.totalPages;
    }

    firstPage() {
        this.page = 0;
        this.refresh();
    }

    lastPage() {
        this.page = this.dmPage.totalPages - 1;
        this.refresh();
    }

    prevPage() {
        if (this.canPrevPage()) {
            this.page--;
            this.refresh();
        }
    }

    nextPage() {
        if (this.canNextPage()) {
            this.page++;
            this.refresh();
        }
    }

    canPrevPage() {
        return this.page > 0;
    }

    canNextPage() {
        return this.page < this.dmPage.totalPages - 1;
    }

}
