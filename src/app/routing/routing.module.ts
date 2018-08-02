import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {SharedModule} from '../shared/shared.module';
import {DomainModule} from '../domain/domain.module';
import {AuthGuardService} from '../auth/auth-guard.service';
import {ViewCaseComponent} from './pages/view-case/view-case.component';
import {HttpClientModule} from '@angular/common/http';

import {RedirectionService} from './redirection.service';


import {DecisionRootComponent} from "./pages/decisions/root/root.component";
import {CreateDecisionComponent} from './pages/decisions/create-decision/create-decision.component';
import {CheckDecisionComponent} from './pages/decisions/check-decision/check-decision.component';
import {DecisionConfirmationComponent} from './pages/decisions/decision-confirmation/decision-confirmation.component';
import {DecisionResolve} from "./resolve/decision.resolve";


import {HearingRootComponent} from "./pages/hearings/root/root.component";
import {CreateHearingComponent} from './pages/hearings/create-hearing/create-hearing.component';
import {CheckHearingComponent} from './pages/hearings/check-hearing/check-hearing.component';
import {HearingConfirmationComponent} from './pages/hearings/hearing-confirmation/hearing-confirmation.component';
import {CaseResolve} from './resolve/case.resolve';


import {CreateQuestionsComponent} from '../domain/components/questions/create/create.component';
import {CheckQuestionsComponent} from '../domain/components/questions/check/check.component';
import {ViewQuestionComponent} from '../domain/components/questions/view/view.component';
import {DeleteQuestionComponent} from '../domain/components/questions/delete/delete.component';
import {EditQuestionComponent} from '../domain/components/questions/edit/edit.component';
import {ReactiveFormsModule} from '@angular/forms';
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
            {
                path: 'decision', component: DecisionRootComponent, resolve: {decision: DecisionResolve}, children: [
                    {path: 'create', component: CreateDecisionComponent},
                    {path: 'check', component: CheckDecisionComponent},
                    {path: 'confirm', component: DecisionConfirmationComponent}
                ]
            },
            {
                    path: 'hearing', component: HearingRootComponent, children: [
                    {path: 'list', component: CreateHearingComponent},
                    {path: 'check', component: CheckHearingComponent},
                    {path: 'confirm', component: HearingConfirmationComponent}
                ]
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
                component: ViewCaseComponent,
            },
            {
                path: ':section/:section_item_id',
                component: ViewCaseComponent,
            },
            {
                path: '',
                component: ViewCaseComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: 'enabled',
            anchorScrolling: 'enabled'
        }),
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
        CheckDecisionComponent,
        DecisionRootComponent,
        DecisionConfirmationComponent,
        HearingRootComponent,
        CreateHearingComponent,
        CheckHearingComponent,
        HearingConfirmationComponent
    ],
    providers: [
        CaseResolve,
        DecisionResolve,
        RedirectionService
    ],
    exports: [
        RouterModule
    ]
})
export class RoutingModule {
}








