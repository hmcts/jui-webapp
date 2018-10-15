import {Component, OnInit, ViewChild, ElementRef, Inject, Input, ChangeDetectorRef} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {PdfService} from '../../data/pdf.service';
import {AnnotationStoreService} from '../../data/annotation-store.service';
import {IAnnotationSet} from '../../data/annotation-set.model';
import {NpaService} from '../../data/npa.service';
import {ApiHttpService} from '../../data/api-http.service';

@Component({
    selector: 'app-annotation-pdf-viewer',
    templateUrl: './annotation-pdf-viewer.component.html',
    styleUrls: ['./annotation-pdf-viewer.component.scss'],
    providers: []
})
export class AnnotationPdfViewerComponent implements OnInit {

    @Input() annotate: boolean;
    @Input() dmDocumentId: string;
    @Input() outputDmDocumentId: string;
    @Input() url = '';
    @Input() annotationSet: IAnnotationSet;
    @Input() baseUrl: string;

    renderedPages: {};
    page: number;
    tool: string;
    showToolbar: boolean;
    toolPos;
    
    @ViewChild('contentWrapper') contentWrapper: ElementRef;
    @ViewChild('contextualToolbar') contextualToolbar: ElementRef;

    constructor(private pdfService: PdfService,
                private npaService: NpaService,
                private apiHttpService: ApiHttpService,
                private annotationStoreService: AnnotationStoreService,
                @Inject(DOCUMENT) private document: any) {
    }

    ngOnInit() {
        this.loadAnnotations(this.annotate);

        this.showToolbar = false;
        this.pdfService.preRun();
        this.pdfService.setRenderOptions({
            documentId: this.url,
            pdfDocument: null,
            scale: parseFloat('1.33'),
            rotate: parseInt(localStorage.getItem(this.url + '/rotate'), 10) || 0
        });

        this.renderedPages = {};
        this.pdfService.render();
        this.tool = 'highlight';
        
        this.pdfService.setHighlightTool();
        this.pdfService.getPageNumber().subscribe(page => this.page = page);
    }

    loadAnnotations(annotate: boolean) {
        if (annotate) {
            this.apiHttpService.baseUrl = this.baseUrl;
            this.annotationStoreService.preLoad(this.annotationSet);
            this.npaService.outputDmDocumentId.next(this.outputDmDocumentId);
        } else {
            this.annotationStoreService.preLoad(null);
        }
    }

    getClickedPage(event) {
        let currentParent = event.target;
        for (let step = 0; step < 5; step++) {
            if (currentParent.parentNode != null) {
                const pageNumber = currentParent.parentNode.getAttribute('data-page-number');
                if (pageNumber != null) {
                    this.pdfService.setPageNumber(parseInt(pageNumber));
                    break;
                };
                currentParent = currentParent.parentNode;
            }
        }
        if(event.view.getSelection().anchorNode.firstChild) {
            this.showToolbar = true;
            const annotationId = event.view.getSelection().anchorNode.firstElementChild.id.substring(26);
            this.renderToolBar(annotationId);
        }else{
            this.showToolbar = false;
        }
    }

    renderToolBar(annotationId) {
        this.annotationStoreService.getAnnotationById(annotationId).then(
            annotation => {
                const rect = annotation.rectangles[0];
                const xPos = rect.x + (rect.width/2);
                const yPos = rect.y;
                this.toolPos = {
                    xPos,
                    yPos
                };
            });
    }

    handlePdfScroll(event) {
        const element = event.srcElement as HTMLInputElement;
        const visiblePageNum = Math.round(element.scrollTop / 1056) + 1; // Hardcoded page height as 1056

        const visiblePage = this.document.querySelector('.page[data-page-number="' + visiblePageNum + '"][data-loaded="false"]');

        if (visiblePage && !this.renderedPages[visiblePageNum]) {
            // Prevent invoking UI.renderPage on the same page more than once.
            this.renderedPages[visiblePageNum] = true;
            setTimeout(this.pdfService.renderPage(visiblePageNum));
        }
        if (this.page !== visiblePageNum) {
            this.page = visiblePageNum;
            if (!isNaN(visiblePageNum)) {
                this.pdfService.setPageNumber(visiblePageNum);
            }
        }
    }
}
