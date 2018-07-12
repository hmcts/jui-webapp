import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-summary-panel',
    templateUrl: './summary-panel.component.html',
    styleUrls: ['./summary-panel.component.scss']
})
export class SummaryPanelComponent {

    @Input() caseId;
    @Input() panelData;

}


