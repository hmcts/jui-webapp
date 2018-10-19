import {Component, OnInit} from '@angular/core';
import {PdfService} from '../../data/pdf.service';
import {AnnotationStoreService} from '../../data/annotation-store.service';

@Component({
  selector: 'app-contextual-toolbar',
  templateUrl: './contextual-toolbar.component.html',
  styleUrls: ['./contextual-toolbar.component.scss']
})
export class ContextualToolbarComponent implements OnInit {

  toolPos: {left, top};
  showToolbar: boolean;
  annotationId: string;

  constructor(private pdfService: PdfService,
              private annotationStoreService: AnnotationStoreService) {
  }

  ngOnInit() {
    this.showToolbar = false;
    this.toolPos = {
      left: 0,
      top: 0
    };
  }

  showToolBar(annotationId: string) {
    const svg = document.querySelector(`g[data-pdf-annotate-id="${annotationId}"]`);
    const highlightRect = <DOMRect>svg.getBoundingClientRect();

    const wrapper = document.querySelector('#annotation-wrapper');
    const wrapperRect = <DOMRect> wrapper.getBoundingClientRect();

    const left = ((highlightRect.left - wrapperRect.left)
     - 108) + highlightRect.width / 2; // Minus half the toolbar width + half the length of the highlight
    const top = ((highlightRect.top - wrapperRect.top)
     - 59) - 5; // Minus height of toolbar + 5px

    this.toolPos = {
      left,
      top
    };

    this.annotationId = annotationId;
    this.showToolbar = true;
  }

  hideToolBar() {
    this.showToolbar = false;
  }

  handleCommentClick() {
    this.pdfService.setAnnotationClicked(this.annotationId);
    this.hideToolBar();
  }

  handleHighlightClick() {
    this.pdfService.setAnnotationClicked(null);
    this.hideToolBar();
  }

  handleClearAnnotations() {
    this.annotationStoreService.clearAnnotations();
  }
}
