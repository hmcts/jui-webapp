import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { DomainModule } from '../domain/domain.module';
import { AuthGuardService } from '../auth/auth-guard.service';
import { ViewCaseComponent } from './pages/view-case/view-case.component';
import { HttpClientModule } from '@angular/common/http';
import { CaseService } from '../case.service';
import { CaseFileService } from '../case-file.service';
import { QuestionService } from '../domain/services/question.service';
import { RedirectionService } from './redirection.service';
import { CreateQuestionsComponent } from '../domain/components/questions/create/create.component';
import { CheckQuestionsComponent } from '../domain/components/questions/check/check.component';
import { ViewQuestionComponent } from '../domain/components/questions/view/view.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'viewcase/:case_id/:section',
        component: ViewCaseComponent
    },
    {
        path: 'viewcase/:case_id/casefile/:section_item_id',
        component: ViewCaseComponent
    },
    {
        path: 'viewcase/:case_id/questions/new',
        component: CreateQuestionsComponent
    },
    {
        path: 'viewcase/:case_id/questions/check',
        component: CheckQuestionsComponent
    },
    {
        path: 'viewcase/:case_id/questions/:question_id',
        component: ViewQuestionComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes),
        SharedModule,
        DomainModule,
        HttpClientModule
    ],
    declarations: [
        HomeComponent,
        ViewCaseComponent
    ],
    providers: [
        CaseService,
        CaseFileService,
        RedirectionService,
        QuestionService,
    ],
    exports: [
        RouterModule
    ]
})
export class RoutingModule {
}








