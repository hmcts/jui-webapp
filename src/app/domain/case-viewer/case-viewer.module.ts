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
import { QuestionsPanelComponent } from './components/questions-panel/questions-panel.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import {DecisionMakeComponent} from './components/decision-make/decision-make.component';
import { HearingMakeComponent } from './components/hearing-make/hearing-make.component';
import { DecisionCheckComponent } from './components/decision-check/decision-check.component';
import { DecisionConfirmationComponent } from './components/decision-confirmation/decision-confirmation.component';
import { HearingConfirmationComponent } from './components/hearing-confirmation/hearing-confirmation.component';
import { HearingCheckComponent } from './components/hearing-check/hearing-check.component';
import { CaseViewerContainerComponent } from './components/case-viewer-container/case-viewer-container.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        DocumentViewerModule,
        RouterModule,
    ],
    exports: [
        CaseViewerComponent,
        DocumentPanelComponent,
        CaseDetailsBarComponent,
        DecisionMakeComponent,
        DecisionCheckComponent,
        DecisionConfirmationComponent,
        HearingMakeComponent,
        HearingCheckComponent,
        HearingConfirmationComponent
    ],
    declarations: [
        CaseViewerComponent,
        DocumentPanelComponent,
        SummaryPanelComponent,
        PartiesPanelComponent,
        TimelinePanelComponent,
        QuestionsPanelComponent,
        TimelineComponent,
        CaseNavComponent,
        CaseDetailsBarComponent,
        DecisionMakeComponent,
        DecisionCheckComponent,
        DecisionConfirmationComponent,
        HearingMakeComponent,
        HearingCheckComponent,
        HearingConfirmationComponent,
        CaseViewerContainerComponent
    ]
})
export class CaseViewerModule {
}
