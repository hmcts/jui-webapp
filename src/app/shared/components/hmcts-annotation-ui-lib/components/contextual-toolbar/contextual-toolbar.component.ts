import {Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {PdfService} from '../../data/pdf.service';
import {AnnotationStoreService} from '../../data/annotation-store.service';
import { Annotation } from '../../data/annotation-set.model';

@Component({
  selector: 'app-contextual-toolbar',
  templateUrl: './contextual-toolbar.component.html',
  styleUrls: ['./contextual-toolbar.component.scss']
})
export class ContextualToolbarComponent implements OnInit, OnDestroy {

  toolPos: {left, top};
  showToolbar: boolean;
  showDelete: boolean;
  annotationId: string;
  annotationSavedSub: Subscription;

  constructor(private pdfService: PdfService,
              private annotationStoreService: AnnotationStoreService,
              private ref: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.annotationSavedSub = this.annotationStoreService.getAnnotationSaved().subscribe(
      contextualOptions => {
        if (contextualOptions.annotation != null) {
          this.showToolBar(contextualOptions.annotation, contextualOptions.showDelete);
        } else {
          this.hideToolBar();
        }
      });

    this.showToolbar = false;
    this.toolPos = {
      left: 0,
      top: 0
    };
  }

  ngOnDestroy(): void {
    this.ref.detach();
    if (this.annotationSavedSub) {
      this.annotationSavedSub.unsubscribe();
    }
  }

  showToolBar(annotation, showDelete) {
    this.showDelete = showDelete;
    const svgSelector = document.querySelector(`g[data-pdf-annotate-id="${annotation.id}"]`);
    const highlightRect = <DOMRect>svgSelector.getBoundingClientRect();

    const wrapper = document.querySelector('#annotation-wrapper');
    const wrapperRect = <DOMRect>wrapper.getBoundingClientRect();

    const left = ((highlightRect.x - wrapperRect.left)
      - 108) + highlightRect.width / 2; // Minus half the toolbar width + half the length of the highlight
    const top = ((highlightRect.y - wrapperRect.top)
      - 59) - 5; // Minus height of toolbar + 5px

    this.toolPos = {
      left,
      top
    };

    this.annotationId = annotation.id;
    this.showToolbar = true;

    if (!this.ref['destroyed']) {
      this.ref.detectChanges();
    }
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

  handleDeleteClick() {
    this.annotationStoreService.deleteAnnotationById(this.annotationId);
    this.hideToolBar();
  }

  handleClearAnnotations() {
    this.annotationStoreService.clearAnnotations();
  }
}
