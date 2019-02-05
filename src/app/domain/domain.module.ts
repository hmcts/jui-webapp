import { NgModule } from '@angular/core';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { SharedModule } from '../shared/shared.module';
import { CaseViewerModule } from './case-viewer/case-viewer.module';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CreateQuestionsComponent } from './components/questions/create/create.component';
import { CheckQuestionsComponent } from './components/questions/check/check.component';
import { ViewQuestionComponent } from './components/questions/view/view.component';
import { DeleteQuestionComponent } from './components/questions/delete/delete.component';
import { EditQuestionComponent } from './components/questions/edit/edit.component';
import { CaseBarComponent } from './components/casebar/casebar.component';
import { UploadComponent } from './components/upload/upload.component';
import {CaseService} from './services/case.service';
import {QuestionService} from './services/question.service';

import {JUIFormsModule} from '../forms/forms.module';
import {GovukModule} from '../govuk/govuk.module';
import {HmctsModule} from '../hmcts/hmcts.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
        JUIFormsModule,
        ReactiveFormsModule,
        BrowserTransferStateModule,
        GovukModule,
        HmctsModule,
        FormsModule
    ],
    exports: [
        CaseBarComponent,
        SearchResultComponent,
        HeaderComponent,
        CaseViewerModule,
        CreateQuestionsComponent,
        CheckQuestionsComponent,
        ViewQuestionComponent,
        DeleteQuestionComponent,
        EditQuestionComponent,
        UploadComponent
    ],
    declarations: [
        CaseBarComponent,
        SearchResultComponent,
        HeaderComponent,
        CreateQuestionsComponent,
        CheckQuestionsComponent,
        ViewQuestionComponent,
        DeleteQuestionComponent,
        EditQuestionComponent,
        UploadComponent
    ],
    providers: [
        CaseService,
        QuestionService
    ]
})
export class DomainModule {
}
