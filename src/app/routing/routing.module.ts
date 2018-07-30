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
import { RedirectionService } from './redirection.service';
import {DecisionRootComponent} from "./pages/decisions/root/root.component";
import { CreateDecisionComponent } from './pages/decisions/create-decision/create-decision.component';
import { HearingMakeComponent } from '../domain/components/hearings/hearing-make/hearing-make.component';
import { DecisionCheckComponent } from './pages/decisions/decision-check/decision-check.component';
import { DecisionConfirmationComponent } from './pages/decisions/decision-confirmation/decision-confirmation.component';
import { HearingCheckComponent } from '../domain/components/hearings/hearing-check/hearing-check.component';
import { HearingConfirmationComponent } from '../domain/components/hearings/hearing-confirmation/hearing-confirmation.component';
import { CaseResolve } from './resolve/case.resolve';
import { DecisionResolve } from "./resolve/decision.resolve";
import { CaseViewerContainerComponent } from '../domain/case-viewer/components/case-viewer-container/case-viewer-container.component';
import { QuestionService } from '../domain/services/question.service';
import { CreateQuestionsComponent } from '../domain/components/questions/create/create.component';
import { CheckQuestionsComponent } from '../domain/components/questions/check/check.component';
import { ViewQuestionComponent } from '../domain/components/questions/view/view.component';
import { DeleteQuestionComponent } from '../domain/components/questions/delete/delete.component';
import { EditQuestionComponent } from '../domain/components/questions/edit/edit.component';
import { ReactiveFormsModule } from '@angular/forms';



import {JUIFormsModule} from "../forms/forms.module";

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
            { path:'decision', component: DecisionRootComponent, resolve: { decision: DecisionResolve }, children: [
                {path: 'create', component: CreateDecisionComponent},
                {path: 'check', component: DecisionCheckComponent},
                {path: 'confirm', component: DecisionConfirmationComponent}
            ]},
            {path: 'hearings-confirmation',component: HearingConfirmationComponent},
            {
                path: '',
                component: ViewCaseComponent,
                children: [
                    {
                        path: '',
                        component: CaseViewerContainerComponent,
                    },
                    {
                        path: 'list-for-hearing',
                        component: HearingMakeComponent
                    },
                    {
                        path: 'check-hearings-notes',
                        component: HearingCheckComponent
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
                        path: 'questions/:question_id/edit',
                        component: EditQuestionComponent
                    },
                    {
                        path: 'questions/:question_id/delete',
                        component: DeleteQuestionComponent
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
        HttpClientModule,
        ReactiveFormsModule,
        JUIFormsModule
    ],
    declarations: [
        HomeComponent,
        ViewCaseComponent,
        CreateDecisionComponent,
        DecisionCheckComponent,
        DecisionRootComponent,
        DecisionConfirmationComponent
    ],
    providers: [
        CaseService,
        CaseResolve,
        DecisionResolve,
        RedirectionService,
        QuestionService,
    ],
    exports: [
        RouterModule
    ]
})
export class RoutingModule {
}








