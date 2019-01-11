import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-case-file-viewer',
    templateUrl: './case-file-viewer.component.html'
})
export class CaseFileViewerComponent implements OnInit {

    @Input() selectedDocument: any;
    @Input() documentUrl: string;
    @Input() allowAnnotations = true;

    constructor() { }

    ngOnInit() {
    }

}
