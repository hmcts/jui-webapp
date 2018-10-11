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
import { StatusComponent } from './components/status/status.component';
import { CaseActionAlertComponent } from './components/case-action-alert/case-action-alert.component';
import {CaseActionsComponent} from './components/case-actions/case-actions.component';

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
        CaseStatusGoto,
        TabsComponent,
        StatusComponent,
        CaseActionsComponent,
        CaseActionAlertComponent
    ],
    exports: [
        TableComponent,
        DataListComponent,
        FooterComponent,
        TimelineComponent,
        QuestionListComponent,
        QuestionComponent,
        ReversePipe,
        CaseStatusGoto,
        TabsComponent,
        StatusComponent,
        CaseActionsComponent,
        CaseActionAlertComponent,
        DocumentViewerModule
    ]
})

export class SharedModule {}



