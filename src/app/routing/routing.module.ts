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
import { RedirectionService} from './redirection.service';
import {DecisionMakeComponent} from '../domain/case-viewer/components/decision-make/decision-make.component';
import {HearingMakeComponent} from '../domain/case-viewer/components/hearing-make/hearing-make.component';
import {DecisionCheckComponent} from '../domain/case-viewer/components/decision-check/decision-check.component';
import {DecisionConfirmationComponent} from '../domain/case-viewer/components/decision-confirmation/decision-confirmation.component';
import {HearingCheckComponent} from '../domain/case-viewer/components/hearing-check/hearing-check.component';
import {HearingConfirmationComponent} from '../domain/case-viewer/components/hearing-confirmation/hearing-confirmation.component';
import {CaseResolve} from './resolve/case.resolve';
import {CaseViewerContainerComponent} from '../domain/case-viewer/components/case-viewer-container/case-viewer-container.component';
import { QuestionService } from '../domain/services/question.service';
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
        path: 'viewcase/:case_id',
        resolve: {
            caseData: CaseResolve
        },
        children: [
            {
                path: 'decision-confirmation',
                component: DecisionConfirmationComponent,
            },
            {
                path: 'hearing-confirmation',
                component: HearingConfirmationComponent,

            },
            {
                path: '',
                component: ViewCaseComponent,
                children: [
                    {
                        path: '',
                        component: CaseViewerContainerComponent,
                    },
                    {
                        path: 'make-decision',
                        component: DecisionMakeComponent
                    },
                    {
                        path: 'check-decision',
                        component: DecisionCheckComponent
                    },
                    {
                        path: 'list-for-hearing',
                        component: HearingMakeComponent
                    },
                    {
                        path: 'check-hearing-notes',
                        component: HearingCheckComponent
                    },
                    {
                        path: 'casefile/:section_item_id',
                        component: ViewCaseComponent
                    },
                    {
                        path: 'questions/new',
                        component: CreateQuestionsComponent
                    },
                    {
                        path: 'questions/check',
                        component: CheckQuestionsComponent
                    },
                    {
                        path: 'questions/:question_id',
                        component: ViewQuestionComponent
                    },
                    {
                        path: ':section',
                        component: CaseViewerContainerComponent,
                    },
                    {
                        path: ':section/:section_item_id',
                        component: CaseViewerContainerComponent,
                    },
                ]
            }

        ]
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
        CaseResolve,
        RedirectionService,
        QuestionService,
    ],
    exports: [
        RouterModule
    ]
})
export class RoutingModule {
}








