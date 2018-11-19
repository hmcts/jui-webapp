import { Component, Input } from '@angular/core';
import { linkItem } from './models/elements.module';
import { PageDate } from '../../../models/section_fields';

@Component({
    selector: 'app-summary-panel',
    templateUrl: './summary-panel.component.html',
    styleUrls: ['./summary-panel.component.scss']
})
export class SummaryPanelComponent {
    @Input() panelData: PageDate;
    public createLink: linkItem = { href: '../decision/create', text: 'Make decision' };
    public hearingLink: linkItem = {href: '../hearing/list', text: 'List for hearing'};
}


