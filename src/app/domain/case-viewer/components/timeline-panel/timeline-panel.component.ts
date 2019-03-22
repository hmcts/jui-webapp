import { Component, Input } from '@angular/core';
import { LinkItem, PageDateWithFields } from '../../../models/section_fields';
import { AuthService } from '../../../../auth/auth.service';

@Component({
    selector: 'app-timeline-panel',
    templateUrl: './timeline-panel.component.html',
    styleUrls: ['./timeline-panel.component.scss']
})
export class TimelinePanelComponent {
    @Input() panelData: PageDateWithFields;
    actionPrimaryButton: LinkItem = { href: '../decision/create', text: 'Make decision' };
    actionSecondaryButton: LinkItem = { href: '../hearing/list', text: 'List for hearing' };

    roles: string[];
    constructor(public authService: AuthService) {
        this.roles = authService.getLoggedInUserRoles();
    }
}
