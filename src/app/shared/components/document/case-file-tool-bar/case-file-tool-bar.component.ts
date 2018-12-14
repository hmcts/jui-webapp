import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-case-file-tool-bar',
    templateUrl: './case-file-tool-bar.component.html',
    styleUrls: ['./case-file-tool-bar.component.scss']
})
export class CaseFileToolBarComponent implements OnInit {
    isCommentView = false;

    @Input() commentViewRedirect = {
        command: [],
        extra: { queryParams: { type: 'comment'} }
    };

    @Input() listViewRedirect = {
        command: [],
        extra: {queryParams: {type: 'list'}}
    };

    constructor(private router: Router) { }

    ngOnInit() {
    }

    commentView() {
        this.isCommentView = true;
        this.router.navigate(this.commentViewRedirect.command, this.commentViewRedirect.extra);
    }

    listView() {
        this.isCommentView = false;
        this.router.navigate(this.listViewRedirect.command, this.listViewRedirect.extra);
    }
}
