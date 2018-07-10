import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {DocumentViewerModule} from '../../shared/components/document-viewer/document-viewer.module';
import {CaseViewerComponent} from './components/case-viewer/case-viewer.component';
import { CaseDetailsBarComponent } from './components/case-details-bar/case-details-bar.component';
import { CaseNavComponent } from './components/case-nav/case-nav.component';
import { DocumentPanelComponent } from './components/document-panel/document-panel.component';
import { SummaryPanelComponent } from './components/summary-panel/summary-panel.component';
import { PartiesPanelComponent } from './components/parties-panel/parties-panel.component';
import { TimelinePanelComponent } from './components/timeline-panel/timeline-panel.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import {CaseDecisionComponent} from './components/case-decision/case-decision.component';
import { ListForHearingComponent } from './components/list-for-hearing/list-for-hearing.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        DocumentViewerModule,
        RouterModule
    ],
    exports: [
        CaseViewerComponent,
        DocumentPanelComponent,
        CaseDetailsBarComponent,
        CaseDecisionComponent,
        ListForHearingComponent
    ],
    declarations: [
        CaseViewerComponent,
        DocumentPanelComponent,
        SummaryPanelComponent,
        PartiesPanelComponent,
        TimelinePanelComponent,
        TimelineComponent,
        CaseNavComponent,
        CaseDecisionComponent,
        CaseDetailsBarComponent,
        ListForHearingComponent
    ]
})
export class CaseViewerModule {
}
