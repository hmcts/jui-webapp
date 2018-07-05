import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-summary-panel',
    templateUrl: './summary-panel.component.html',
    styleUrls: ['./summary-panel.component.scss']
})
export class SummaryPanelComponent {
    @Input() panelData;

    @Input() caseId;

    constructor(private router: Router){
    }

    goToTimeline() {
        this.router.navigate(['viewcase', this.caseId, 'timeline']);
    }

    private getRecentEvents() {
        if (this.panelData != null && this.panelData.sections != null) {
            const recentEventIndex = this.panelData.sections.findIndex(section => section.id === 'recentEvents');
            if (recentEventIndex >= 0) {
                const recentEventsSection = this.panelData.sections[recentEventIndex];
                if (recentEventsSection != null
                    && recentEventsSection.fields != null && recentEventsSection.fields.length > 0) {
                    let recentEvents = recentEventsSection.fields[0].value;
                    if (recentEvents.length > 3) {
                        recentEvents = recentEvents.slice(0, 3);
                    }
                    return recentEvents;
                }

            }
        }
    }
}


