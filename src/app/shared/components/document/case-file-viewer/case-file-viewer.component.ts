import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-case-file-viewer',
    templateUrl: './case-file-viewer.component.html'
})
export class CaseFileViewerComponent implements OnInit {

    @Input() selectedDocument: any;
    @Input() documentUrl: string;
    @Input() allowAnnotations = true;

    toolbarButtons = { showDownload: false, showPrint: true };

    constructor() { }

    ngOnInit() {
    }

    onMediaLoadStatus($event: any) {
        console.log('onMediaLoadStatus', $event, this.selectedDocument);
    }

    onMediaLoadException($event: any) {
        console.log('onMediaLoadException', $event);
    }

}
