import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { PdfService } from '../../data/pdf.service';
import { AnnotationStoreService } from '../../data/annotation-store.service';
import { IAnnotationSet } from '../../data/annotation-set.model';
import { NpaService } from '../../data/npa.service';

@Component({
  selector: 'app-annotation-pdf-viewer',
  templateUrl: './annotation-pdf-viewer.component.html',
  styleUrls: ['./annotation-pdf-viewer.component.scss'],
  providers: []
})
export class AnnotationPdfViewerComponent implements OnInit {

  annotate: boolean;
  renderedPages: {};
  page: number;
  dmDocumentId: string;
  outputDmDocumentId: string;
  url = '';
  tool: String;
  annotationSet: IAnnotationSet;

  @ViewChild("contentWrapper") contentWrapper: ElementRef;

  constructor(private pdfService: PdfService,
              private annotationStoreService: AnnotationStoreService,
              private npaService: NpaService,
              @Inject(DOCUMENT) private document: any) {
  }

  ngOnInit() {
    if (this.annotate) {
      this.annotationStoreService.preLoad(this.annotationSet);
      this.npaService.outputDmDocumentId.next(this.outputDmDocumentId);
    } else {
      this.annotationStoreService.preLoad(null);
    }

    this.pdfService.preRun();
    this.pdfService.setRenderOptions({
      documentId: this.url,
      pdfDocument: null,
      scale: parseFloat("1.33"),
      rotate: parseInt(localStorage.getItem(this.url + '/rotate'), 10) || 0
    });

    this.renderedPages = {};
    this.pdfService.render();
    this.tool = 'cursor';

    this.pdfService.getPageNumber().subscribe(
      data => this.page = data
    )
  }

  getClickedPage(event) {
    let currentParent = event.target;
    for (let step = 0; step < 5; step++) {
      if(currentParent.parentNode != null) {
        const pageNumber = currentParent.parentNode.getAttribute('data-page-number');
        if (pageNumber != null) {
          this.pdfService.setPageNumber(parseInt(pageNumber));
          break;
        };
      currentParent = currentParent.parentNode;
      }
    }
    this.tool = 'cursor';
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
    if (this.page != visiblePageNum) {
      this.page = visiblePageNum;
      if (!isNaN(visiblePageNum)) {
        this.pdfService.setPageNumber(visiblePageNum);
      }
    }
  }
}
