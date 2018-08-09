import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CaseViewerComponent } from './components/case-viewer/case-viewer.component';
import { SharedModule } from '../../shared/shared.module';
import { DocumentPanelComponent } from './components/document-panel/document-panel.component';
import { SummaryPanelComponent } from './components/summary-panel/summary-panel.component';
import { PartiesPanelComponent } from './components/parties-panel/parties-panel.component';
import { TimelinePanelComponent } from './components/timeline-panel/timeline-panel.component';
import { QuestionsPanelComponent } from './components/questions-panel/questions-panel.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { DocumentViewerModule } from '../../shared/components/document-viewer/document-viewer.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        DocumentViewerModule,
        RouterModule,
        ReactiveFormsModule
    ],
    exports: [
        CaseViewerComponent,
        DocumentPanelComponent
    ],
    declarations: [
        CaseViewerComponent,
        DocumentPanelComponent,
        SummaryPanelComponent,
        PartiesPanelComponent,
        TimelinePanelComponent,
        QuestionsPanelComponent,
        TimelineComponent
    ]
})
export class CaseViewerModule {
}
