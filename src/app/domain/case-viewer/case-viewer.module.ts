import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {CaseViewerComponent} from './components/case-viewer/case-viewer.component';
import {SharedModule} from '../../shared/shared.module';
import {DocumentPanelComponent} from './components/document-panel/document-panel.component';
import {SummaryPanelComponent} from './components/summary-panel/summary-panel.component';
import {PartiesPanelComponent} from './components/parties-panel/parties-panel.component';
import {TimelinePanelComponent} from './components/timeline-panel/timeline-panel.component';
import {QuestionsPanelComponent} from './components/questions-panel/questions-panel.component';
import {DocumentViewerModule} from '../../shared/components/document-viewer/document-viewer.module';
import {HmctsModule} from '../../hmcts/hmcts.module';
import {GovukModule} from '../../govuk/govuk.module';
import {FormsModule} from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        DocumentViewerModule,
        RouterModule,
        HmctsModule,
        GovukModule,
        FormsModule
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
        QuestionsPanelComponent
    ],
    providers: []
})
export class CaseViewerModule {
}
