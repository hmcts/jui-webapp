import { Component, Input } from '@angular/core';
import { LinkItem } from './models/elements.module';
import { PageDateDefault } from '../../../models/section_fields';

@Component({
    selector: 'app-summary-panel',
    templateUrl: './summary-panel.component.html',
    styleUrls: ['./summary-panel.component.scss']
})
export class SummaryPanelComponent {
    @Input() panelData: PageDateDefault;
    public createLink: LinkItem = { href: '../decision/create', text: 'Make decision' };
    public hearingLink: LinkItem = {href: '../hearing/list', text: 'List for hearing'};
}


