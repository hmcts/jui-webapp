import {Component, OnInit, ChangeDetectorRef, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';
import { AnnotationStoreService } from '../../data/annotation-store.service';
import { Annotation, Comment } from '../../data/annotation-set.model';
import { PdfService } from '../../data/pdf.service';

@Component({
  selector: 'app-contextual-toolbar',
  templateUrl: './contextual-toolbar.component.html',
  styleUrls: ['./contextual-toolbar.component.scss']
})
export class ContextualToolbarComponent implements OnInit, OnDestroy {

  toolPos: {left, top};
  isShowToolbar: boolean;
  showDelete: boolean;
  annotation: Annotation;
  private contextualToolBarOptions: Subscription;

  constructor(private annotationStoreService: AnnotationStoreService,
              private ref: ChangeDetectorRef,
              @Inject(DOCUMENT) private document: any) {
    this.toolPos = {
      left: 0,
      top: 0
    };
  }

  ngOnInit() {
    this.contextualToolBarOptions = this.annotationStoreService.getToolbarUpdate()
      .subscribe(contextualOptions => {
        if (contextualOptions.annotation != null) {
          this.showToolBar(contextualOptions.annotation, contextualOptions.showDelete);
        } else {
          this.hideToolBar();
        }
      });
    this.isShowToolbar = false;
  }

  ngOnDestroy(): void {
    this.ref.detach();
    if (this.contextualToolBarOptions) {
      this.contextualToolBarOptions.unsubscribe();
    }
  }

  showToolBar(annotation: Annotation, showDelete?: boolean) {
    this.annotation = annotation;
    this.showDelete = showDelete;

    this.toolPos = this.getRelativePosition(annotation.id);
    this.isShowToolbar = true;

    if (!this.ref['destroyed']) {
      this.ref.detectChanges();
    }
  }

  getRelativePosition(annotationId: string): {left: number; top: number} {
    const svgSelector = this.document.querySelector(`g[data-pdf-annotate-id="${annotationId}"]`);
    const highlightRect = <DOMRect>svgSelector.getBoundingClientRect();

    const wrapper = this.document.querySelector('#annotation-wrapper');
    const wrapperRect = <DOMRect>wrapper.getBoundingClientRect();

    const left = ((highlightRect.x - wrapperRect.left)
      - 175) + highlightRect.width / 2; // Minus half the toolbar width + half the length of the highlight
    const top = ((highlightRect.y - wrapperRect.top)
      - 59) - 5; // Minus height of toolbar + 5px

    return {
      left,
      top
    };
  }

  hideToolBar() {
      this.annotation = null;
      this.isShowToolbar = false;
      this.showDelete = false;

      if (!this.ref['destroyed']) {
        this.ref.detectChanges();
      }
  }

  handleCommentBtnClick() {
    if (this.annotation.comments.length === 0 ) {
        this.annotationStoreService.addComment(new Comment(null, this.annotation.id, null, null, null, null, null, null, null));
    }
    setTimeout(() => {
        const tempAnnotation = this.annotation;
        this.hideToolBar();
        this.annotationStoreService.setCommentFocusSubject(tempAnnotation, true);
        }, 10);
  }

  handleHighlightBtnClick() {
    this.hideToolBar();
  }

  handleDeleteBtnClick() {
    this.annotationStoreService.deleteAnnotationById(this.annotation.id);
    setTimeout(() => {this.hideToolBar(); }, 10);
    this.annotationStoreService.setAnnotationFocusSubject(this.annotation);
  }

  handleClearAnnotations() {
    this.annotationStoreService.clearAnnotations();
  }
}
