import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {ViewerAnchorDirective} from './viewers/viewer-anchor.directive';
import {ViewerFactoryService} from './viewers/viewer-factory.service';
import {Viewer} from './viewers/viewer';
import {UrlFixerService} from './url-fixer.service';
import {DocumentViewerService} from './document-viewer.service';

@Component({
    selector: 'app-document-viewer',
    templateUrl: './document-viewer.component.html',
    styleUrls: ['./document-viewer.component.scss']
})
export class DocumentViewerComponent implements OnChanges, OnInit {

    @ViewChild(ViewerAnchorDirective) viewerAnchor: ViewerAnchorDirective;
    @Input() url = '';
    @Input() annotate: boolean;
    @Input() page = 1;
    @Output() pageChanged = new EventEmitter<number>();
    @Input() baseUrl: string;

    // todo make a class
    mimeType: string;
    docName: string;
    viewerComponent: Viewer;
    error: string;

    constructor(private viewerFactoryService: ViewerFactoryService,
                private urlFixer: UrlFixerService,
                private documentViewerService: DocumentViewerService) {
    }


    ngOnInit(): void {

    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.url || changes.annotate) {
            this.buildComponent();
        }
        if (changes.page && this.viewerComponent) {
            this.viewerComponent.page = changes.page.currentValue;
        }
    }

    buildComponent() {
        if (!this.url) {
            throw new Error('url is a required arguments');
        }
        this.documentViewerService.fetch(`${this.urlFixer.fixDm(this.url, this.baseUrl)}`).subscribe(resp => {
            if (resp && resp._links) {
                this.docName = resp.originalDocumentName;
                this.viewerComponent =
                    this.viewerFactoryService.buildViewer(resp, this.annotate, this.viewerAnchor.viewContainerRef, this.baseUrl);
                if (this.viewerComponent != null && this.viewerComponent.pageChanged) {
                    this.viewerComponent.pageChanged.subscribe((value => {
                        this.pageChanged.emit(value);
                    }));
                    this.viewerComponent.page = this.page;
                }
            }
        }, err => {
            this.error = err;
        });
    }
}
