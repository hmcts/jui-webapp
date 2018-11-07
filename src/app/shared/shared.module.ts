import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { DataListComponent } from './components/data-list/data-list.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import {CdkTableModule} from '@angular/cdk/table';
import {DocumentViewerModule} from './components/document-viewer/document-viewer.module';
import { RouterModule} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {GovukModule} from '../govuk/govuk.module';
import {HmctsModule} from '../hmcts/hmcts.module';
import {TimelineComponent} from './components/timeline/timeline.component';
import {QuestionListComponent} from './components/question-list/question-list.component';
import {QuestionComponent} from './components/question/question.component';
import {ReversePipe} from './pipes/array-reverse/reverse.pipe';
import {CaseStatusGoto} from './pipes/case-status-goto/case.status.goto';
import { TabsComponent } from './components/tabs/tabs.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { StatusComponent } from './components/status/status.component';
import { CaseActionAlertComponent } from './components/case-action-alert/case-action-alert.component';
import {CaseActionsComponent} from './components/case-actions/case-actions.component';
import { CaseFileComponent } from './components/document/case-file/case-file.component';
import { CaseFileToolBarComponent } from './components/document/case-file-tool-bar/case-file-tool-bar.component';
import { CaseFileTreeListComponent } from './components/document/case-file-tree-list/case-file-tree-list.component';
import { CaseFileAnnotationListComponent } from './components/document/case-file-annotation-list/case-file-annotation-list.component';
import { CaseFileViewerComponent } from './components/document/case-file-viewer/case-file-viewer.component';
import { DocumentListComponent } from './components/document-list/document-list.component';
import { DocumentUploadComponent } from './components/document-upload/document-upload.component';

@NgModule({
    imports: [
        CommonModule,
        CdkTableModule,
        FormsModule,
        ReactiveFormsModule,
        DocumentViewerModule,
        RouterModule,
        GovukModule,
        HmctsModule
    ],
    declarations: [
        TableComponent,
        DataListComponent,
        FooterComponent,
        TimelineComponent,
        QuestionListComponent,
        QuestionComponent,
        ReversePipe,
        TabsComponent,
        CheckboxComponent,
        CaseStatusGoto,
        TabsComponent,
        StatusComponent,
        CaseActionsComponent,
        CaseActionAlertComponent,
        CaseFileComponent,
        CaseFileToolBarComponent,
        CaseFileTreeListComponent,
        CaseFileAnnotationListComponent,
        CaseFileViewerComponent,
        DocumentListComponent,
        DocumentUploadComponent
    ],
    exports: [
        TableComponent,
        DataListComponent,
        FooterComponent,
        TimelineComponent,
        QuestionListComponent,
        QuestionComponent,
        ReversePipe,
        TabsComponent,
        CheckboxComponent,
        CaseStatusGoto,
        TabsComponent,
        StatusComponent,
        CaseActionsComponent,
        CaseActionAlertComponent,
        DocumentViewerModule,
        CaseFileComponent,
        CaseFileToolBarComponent,
        CaseFileTreeListComponent,
        CaseFileAnnotationListComponent,
        CaseFileViewerComponent,
        DocumentViewerModule,
        DocumentListComponent,
        DocumentUploadComponent,
    ]
})

export class SharedModule {}



