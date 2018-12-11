import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-case-file-tree-list',
    templateUrl: './case-file-tree-list.component.html',
    styleUrls: ['./case-file-tree-list.component.scss']
})
export class CaseFileTreeListComponent implements OnInit {

    @Input() documents: any;

    constructor() {
    }

    ngOnInit() {
    }
}
