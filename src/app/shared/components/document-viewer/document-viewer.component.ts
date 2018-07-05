import {
  Component,
  EventEmitter,
  Input,
  OnChanges, OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ViewerAnchorDirective} from './viewers/viewer-anchor.directive';
import {ViewerFactoryService} from './viewers/viewer-factory.service';
import {Viewer} from './viewers/viewer';
import {UrlFixerService} from './url-fixer.service';

@Component({
  selector: 'app-document-viewer',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.scss']
})
export class DocumentViewerComponent implements OnChanges, OnInit  {

  @ViewChild(ViewerAnchorDirective) viewerAnchor: ViewerAnchorDirective;
  @Input() url: string;
  @Input() annotate: boolean;
  @Input() page = 1;
  @Output() pageChanged = new EventEmitter<number>();
  @Input() baseUrl: string;

  // todo make a class
  mimeType: string;
  docName: string;
  viewerComponent: Viewer;
  error: string;

  constructor(private http: HttpClient,
              private urlFixer: UrlFixerService,
              private viewerFactoryService: ViewerFactoryService) { }


  ngOnInit(): void {
    this.buildComponent();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
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
    this.http.get<any>(`${this.urlFixer.fixDm(this.url, this.baseUrl)}`, {})
      .subscribe(
        resp => {
          if (resp && resp._links) {
            this.docName = resp.originalDocumentName;
            this.viewerComponent =
              this.viewerFactoryService.buildViewer(resp, this.annotate, this.viewerAnchor.viewContainerRef, this.baseUrl);
            this.viewerComponent.pageChanged.subscribe((value => {
              this.pageChanged.emit(value);
            }));
            this.viewerComponent.page = this.page;
          }
        },
        err => {
          this.error = err;
        });
  }

}
