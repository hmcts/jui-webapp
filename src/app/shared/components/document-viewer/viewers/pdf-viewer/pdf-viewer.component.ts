import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Viewer} from '../viewer';
import {PDFDocumentProxy} from 'ng2-pdf-viewer';
import {PDFJSStatic as PDFJS} from 'pdfjs-dist';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements OnInit, OnChanges, Viewer {

  @Input() numPages: number;
  @Input() page = 1;
  private pdf: PDFDocumentProxy;

  @Input() url: string;
  @Input() originalUrl: string;
  @Output() afterLoadComplete = new EventEmitter<any>();
  @Output() pageRendered = new EventEmitter<CustomEvent>();
  @Output() pageChanged = new EventEmitter<number>();

  src: any;

  constructor() {
    // PDFJS.workerSrc = '/pdfjs/pdf.worker.js';
  }

  ngOnInit() {
    this.src = {
      url: this.url,
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  afterPdfLoadComplete(pdf: PDFDocumentProxy) {
    console.log('(pdfLoadComplete)');
    this.pdf = pdf;
    this.numPages = pdf.numPages;
    this.afterLoadComplete.emit(pdf);
  }

  afterPageRendered(e: CustomEvent) {
    this.pageRendered.emit(e);
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.pageChanged.emit(this.page);
    }
  }

  nextPage() {
    if (this.page < this.numPages) {
      this.page++;
      this.pageChanged.emit(this.page);
    }
  }
}
