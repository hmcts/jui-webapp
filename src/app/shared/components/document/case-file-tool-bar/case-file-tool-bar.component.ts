import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

export interface ListView {
    command: Array<any>;
    extra: {
        queryParams: {
            type:  string;
        }
    }
};
@Component({
    selector: 'app-case-file-tool-bar',
    templateUrl: './case-file-tool-bar.component.html',
    styleUrls: ['./case-file-tool-bar.component.scss']
})
export class CaseFileToolBarComponent {
    isCommentView = false;

    @Input() commentViewRedirect: ListView;
    @Input() listViewRedirect: ListView;

    constructor(private router: Router) { }

    commentView() {
        this.isCommentView = true;
        this.router.navigate(this.commentViewRedirect.command, this.commentViewRedirect.extra);
    }

    listView() {
        this.isCommentView = false;
        this.router.navigate(this.listViewRedirect.command, this.listViewRedirect.extra);
    }
}
