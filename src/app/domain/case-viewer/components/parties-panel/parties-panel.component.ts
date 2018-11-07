import { Component, Input } from '@angular/core';
import {PageDate} from '../../../models/section_fields';

@Component({
    selector: 'app-parties-panel',
    templateUrl: './parties-panel.component.html',
    styleUrls: ['./parties-panel.component.scss']
})
export class PartiesPanelComponent {
    @Input() panelData: PageDate;
}
