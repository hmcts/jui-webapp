import { Component, Input, OnInit, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-case-file-viewer',
  templateUrl: './case-file-viewer.component.html',
  styleUrls: ['./case-file-viewer.component.scss']
})
export class CaseFileViewerComponent implements OnInit, OnChanges {

  @Input() url: string;
  @Input() documents: Object;
  mimeType: string;
  docName: string;
  error: string;

  constructor() { }

  ngOnInit(): void {
    this.buildComponent();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);

    if (changes.url) {
      this.buildComponent();
    }
  }

  buildComponent() {
    // if (!this.url) {
    //   throw new Error('url is a required arguments');
    // }

    console.log('url', this.url);
  }

}
