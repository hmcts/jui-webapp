import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { SharedModule } from '../shared/shared.module';
import { CaseViewerModule } from './case-viewer/case-viewer.module';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateQuestionsComponent } from './components/questions/create/create.component';
import { CheckQuestionsComponent } from './components/questions/check/check.component';
import { ViewQuestionComponent } from './components/questions/view/view.component';
import { CaseBarDetailsComponent } from './components/casebar-details/casebar-details.component';
import { CaseBarComponent } from './components/casebar/casebar.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        CaseBarDetailsComponent,
        CaseBarComponent,
        SearchResultComponent,
        HeaderComponent,
        CaseViewerModule,
        CreateQuestionsComponent,
        CheckQuestionsComponent,
        ViewQuestionComponent
    ],
    declarations: [
        CaseBarDetailsComponent,
        CaseBarComponent,
        SearchResultComponent,
        HeaderComponent,
        CreateQuestionsComponent,
        CheckQuestionsComponent,
        ViewQuestionComponent
    ],
    providers: []
})
export class DomainModule {
}
