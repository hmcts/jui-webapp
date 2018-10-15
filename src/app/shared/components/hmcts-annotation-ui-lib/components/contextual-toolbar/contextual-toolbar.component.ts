import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
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
  @Input() toolPos;

  outputDocumentId: string;

  constructor(private pdfService: PdfService,
              private annotationStoreService: AnnotationStoreService,
              private npaService: NpaService) {
    this.tool = 'highlight';
  }

  ngOnInit() {
    this.npaService.outputDmDocumentId.subscribe(
      outputDocumentId => this.outputDocumentId = outputDocumentId
    );
  }

  ngOnChanges() {
    console.log(this.toolPos);
    this.pdfService.setHighlightTool();
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
