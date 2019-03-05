import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RotationService} from '../../hmcts-em-viewer-ui/viewers/annotation-pdf-viewer/rotation-toolbar/rotation.service';

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
    templateUrl: './case-file-tool-bar.component.html'
})
export class CaseFileToolBarComponent {
    isCommentView = false;

    @Input() commentViewRedirect: ListView;
    @Input() listViewRedirect: ListView;

    constructor(private router: Router,
                private rotationService: RotationService) { }

    commentView() {
        this.isCommentView = true;
        this.router.navigate(this.commentViewRedirect.command, this.commentViewRedirect.extra);
    }

    listView() {
        this.isCommentView = false;
        this.router.navigate(this.listViewRedirect.command, this.listViewRedirect.extra);
    }

    toggleViewRotation() {
        this.rotationService.toggleRotation();
    }
}
