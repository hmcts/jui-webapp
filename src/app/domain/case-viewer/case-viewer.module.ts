import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CaseViewerComponent} from './components/case-viewer/case-viewer.component';
import {SharedModule} from '../../shared/shared.module';
import { DocumentPanelComponent } from './components/document-panel/document-panel.component';
import { SummaryPanelComponent } from './components/summary-panel/summary-panel.component';
import { PartiesPanelComponent } from './components/parties-panel/parties-panel.component';
import { CaseNavComponent } from './components/case-nav/case-nav.component';
import {DocumentViewerModule} from '../../shared/components/document-viewer/document-viewer.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        DocumentViewerModule
    ],
    exports: [
        CaseViewerComponent,
        DocumentPanelComponent,
    ],
    declarations: [
        CaseViewerComponent,
        DocumentPanelComponent,
        SummaryPanelComponent,
        PartiesPanelComponent,
        CaseNavComponent
    ]
})
export class CaseViewerModule {
}
