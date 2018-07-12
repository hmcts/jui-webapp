import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-questions-panel',
    templateUrl: './questions-panel.component.html',
    styleUrls: ['./questions-panel.component.scss']
})
export class QuestionsPanelComponent {
    @Input() panelData;
}
