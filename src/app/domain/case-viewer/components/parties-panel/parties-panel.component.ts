import { Component, Input } from '@angular/core';
import {LinkItem, PageDateDefault} from '../../../models/section_fields';

@Component({
    selector: 'app-parties-panel',
    templateUrl: './parties-panel.component.html',
    styleUrls: ['./parties-panel.component.scss']
})
export class PartiesPanelComponent {
    @Input() panelData: PageDateDefault;
    actionPrimaryButton: LinkItem = {href: '../decision/create', text: 'Make decision'};
    actionSecondaryButton: LinkItem = {href: '../hearing/list', text: 'List for hearing'};
}
