import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {PdfService} from '../../data/pdf.service';
import {AnnotationStoreService} from '../../data/annotation-store.service';
import {NpaService} from '../../data/npa.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnChanges {

  @ViewChild('highlightTool') highlightTool: ElementRef;
  @ViewChild('pointerTool') pointerPool: ElementRef;

  @Input() dmDocumentId: string;
  @Input() tool: string;
  @Output() toolChange: EventEmitter<string> = new EventEmitter<string>();
  outputDocumentId: string;

  constructor(private pdfService: PdfService,
              private annotationStoreService: AnnotationStoreService,
              private npaService: NpaService) {
  }

  ngOnInit() {
//    this.handleHighlightClick();
    this.npaService.outputDmDocumentId.subscribe(
      outputDocumentId => this.outputDocumentId = outputDocumentId
    );
  }

  ngOnChanges() {
    if (this.tool === 'cursor') {
      this.pdfService.setCursorTool();
    } else {
      this.pdfService.setHighlightTool();
    }
  }

  handleHighlightClick() {
    this.tool = 'highlight';
    this.toolChange.emit(this.tool);
  }

  handleClearAnnotations() {
    this.annotationStoreService.clearAnnotations();
  }

  handlePointerClick() {
    this.tool = 'cursor';
    this.toolChange.emit(this.tool);
  }

  onSaveClick() {
    this.annotationStoreService.saveData();
  }

}
