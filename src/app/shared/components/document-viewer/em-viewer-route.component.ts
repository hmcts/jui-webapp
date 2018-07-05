import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-dm-viewer-route',
  template: `
    <input #docUrlInput type="text" [value]="url" (keyup.enter)="onDocEnter(docUrlInput.value)"/>
    <input #docPageInput type="text" [value]="page" (keyup.enter)="onEnter(docPageInput.value)"/>
    <app-em-viewer *ngIf="url;else no_url" [url]="url" [page]="page" [annotate]="annotate"
                   (pageChanged)="pageChanged($event)">
    </app-em-viewer>
    <ng-template class="grid-row" #no_url >
        <div class="column-full">
          <div class="error-summary" role="alert" aria-labelledby="error-summary-heading-example-1" tabindex="-1">
            <h2 class="heading-medium error-summary-heading"
                id="error-summary-heading-example-1">No Document url has been provided to Document Viewer</h2>
            <p>Please provide a Document url</p>
            <ul class="error-summary-list">
              <li><a href="javascript:history.back()">Go Back</a></li>
            </ul>
          </div>
      </div>
      <div>
        <p></p>
      </div>
    </ng-template>`
})
export class EmViewerRouteComponent implements OnInit {
  url: string;
  annotate: boolean;
  page = 1;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.url = params.url;
        this.annotate = params.annotate === 'true';
      });
  }

  onEnter(value: string) {
      console.log(value);
      this.page = parseInt(value, 10);
  }

  onDocEnter(value: string) {
    this.url = value;
  }

  pageChanged(value: number) {
    this.page = value;
  }
}
