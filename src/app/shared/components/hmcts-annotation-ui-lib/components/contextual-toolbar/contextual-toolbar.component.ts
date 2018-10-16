import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import {PdfService} from '../../data/pdf.service';
import {AnnotationStoreService} from '../../data/annotation-store.service';
import {NpaService} from '../../data/npa.service';

@Component({
  selector: 'app-contextual-toolbar',
  templateUrl: './contextual-toolbar.component.html',
  styleUrls: ['./contextual-toolbar.component.scss']
})
export class ContextualToolbarComponent implements OnInit, OnChanges {

  @ViewChild('highlightTool') highlightTool: ElementRef;

  @Input() dmDocumentId: string;
  @Input() tool: string;
  toolPos;
  showToolbar: boolean;
  outputDocumentId: string;

  constructor(private pdfService: PdfService,
              private annotationStoreService: AnnotationStoreService,
              private npaService: NpaService) {
    this.tool = 'highlight';
  }

  ngOnInit() {
    this.toolPos = {
      left: 0,
      top: 0
    };

    this.npaService.outputDmDocumentId.subscribe(
      outputDocumentId => this.outputDocumentId = outputDocumentId
    );
  }

  ngOnChanges() {
    this.pdfService.setHighlightTool();
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

    this.showToolbar = true;
  }

  hideToolBar() {
    this.showToolbar = false;
  }

  handleCommentClick() {

  }

  handleHighlightClick() {
    this.tool = 'highlight';
  }

  handleClearAnnotations() {
    this.annotationStoreService.clearAnnotations();
  }
}
