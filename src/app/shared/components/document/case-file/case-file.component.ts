import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
    selector: 'app-case-file',
    templateUrl: './case-file.component.html',
    styleUrls: ['./case-file.component.scss']
})
export class CaseFileComponent implements OnInit, OnChanges {

    @Input() documents: any[];
    @Input() selectedDocument: any;
    @Input() documentUrl: string;
    @Input() caseFileType: string;
    allowAnnotations: boolean;

    constructor() { }

    ngOnInit() {
        this.update();
    }

    ngOnChanges(changes): void {
        this.update();
    }

    update() {
        this.allowAnnotations = this.caseFileType === 'comment';
    }
}
