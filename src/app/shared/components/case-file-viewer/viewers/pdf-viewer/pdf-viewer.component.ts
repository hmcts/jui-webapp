import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements OnInit {
  src: any = '/assets/pdf-test.pdf';

  page: number = 1;
  totalPages: number;
  isLoaded: boolean = false;

  @Input() url: string;

  /**
   * May be delete
   */
  ngOnInit() {
    this.src = {
      url: this.url,
    };
  }

  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
    this.isLoaded = true;
  }

  nextPage() {
    this.page++;
  }

  prevPage() {
    this.page--;
  }
}
