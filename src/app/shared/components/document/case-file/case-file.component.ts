import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-case-file',
    templateUrl: './case-file.component.html',
    styleUrls: ['./case-file.component.scss']
})
export class CaseFileComponent implements OnInit {

    @Input() documents: any;

    constructor() { }

    ngOnInit() {
    }

}
