import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-case-file-tree-list',
    templateUrl: './case-file-tree-list.component.html'
})
export class CaseFileTreeListComponent {

    @Input() documents: any;
}
