import { NgModule } from '@angular/core';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { SharedModule } from '../shared/shared.module';
import { CaseViewerModule } from './case-viewer/case-viewer.module';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateQuestionsComponent } from './components/questions/create/create.component';
import { CheckQuestionsComponent } from './components/questions/check/check.component';
import { ViewQuestionComponent } from './components/questions/view/view.component';
import { DeleteQuestionComponent } from './components/questions/delete/delete.component';
import { EditQuestionComponent } from './components/questions/edit/edit.component';
import { CaseBarDetailsComponent } from './components/casebar-details/casebar-details.component';
import { CaseBarComponent } from './components/casebar/casebar.component';
import {CaseService} from '../domain/services/case.service';
import {QuestionService} from '../domain/services/question.service';

import {JUIFormsModule} from "../forms/forms.module";

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
        JUIFormsModule,
        ReactiveFormsModule,
        BrowserTransferStateModule
    ],
    exports: [
        CaseBarDetailsComponent,
        CaseBarComponent,
        SearchResultComponent,
        HeaderComponent,
        CaseViewerModule,
        CreateQuestionsComponent,
        CheckQuestionsComponent,
        ViewQuestionComponent,
        DeleteQuestionComponent,
        EditQuestionComponent
    ],
    declarations: [
        CaseBarDetailsComponent,
        CaseBarComponent,
        SearchResultComponent,
        HeaderComponent,
        CreateQuestionsComponent,
        CheckQuestionsComponent,
        ViewQuestionComponent,
        DeleteQuestionComponent,
        EditQuestionComponent
    ],
    providers: [
        CaseService,
        QuestionService
    ]
})
export class DomainModule {
}
