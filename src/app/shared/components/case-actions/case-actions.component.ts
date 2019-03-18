import { Component, Input, OnInit } from '@angular/core';
import { LinkItem } from '../../../domain/models/section_fields';
//import { AuthService } from '../../../auth/auth.service';

@Component({
    selector: 'app-case-actions',
    templateUrl: './case-actions.component.html'
})
export class CaseActionsComponent {

    @Input() header: string;
    @Input() actionPrimaryButton: LinkItem;
    @Input() actionSecondaryButton: LinkItem;
    @Input() actionThirdButton: LinkItem;
    @Input() roleList: string[];
    // roleList: string[];
    // constructor(public authService: AuthService) {
    //     this.roleList = authService.getLoggedInUserRoles();
    // }


}
