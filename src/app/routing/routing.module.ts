import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/generic-page/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { DomainModule } from '../domain/domain.module';
import { AuthGuardService } from '../auth/auth-guard.service';
import { ViewCaseComponent } from './pages/view-case/view-case.component';
import { HttpClientModule } from '@angular/common/http';
import { RedirectionService } from './redirection.service';
import { DecisionRootComponent } from './pages/decisions/root/root.component';
import { CheckDecisionComponent } from './pages/decisions/check-decision/check-decision.component';
import { DecisionConfirmationComponent } from './pages/decisions/decision-confirmation/decision-confirmation.component';
import { HearingRootComponent } from './pages/hearings/root/root.component';
import { CreateHearingComponent } from './pages/hearings/create-hearing/create-hearing.component';
import { CheckHearingComponent } from './pages/hearings/check-hearing/check-hearing.component';
import { HearingConfirmationComponent } from './pages/hearings/hearing-confirmation/hearing-confirmation.component';
import { CaseResolve } from './resolve/case.resolve';
import { CreateQuestionsComponent } from '../domain/components/questions/create/create.component';
import { CheckQuestionsComponent } from '../domain/components/questions/check/check.component';
import { ViewQuestionComponent } from '../domain/components/questions/view/view.component';
import { DeleteQuestionComponent } from '../domain/components/questions/delete/delete.component';
import { EditQuestionComponent } from '../domain/components/questions/edit/edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { JUIFormsModule } from '../forms/forms.module';
import { GovukModule } from '../govuk/govuk.module';
import { HmctsModule } from '../hmcts/hmcts.module';
import { MakeDecisionComponent } from './pages/decisions/make-decision/make-decision.component';
import { DraftConsentOrderComponent } from './pages/decisions/draft-consent-order/draft-consent-order.component';
import { GenericPageComponent } from './pages/generic-page/generic-page.component';
import { ErrorServiceUnavailableComponent } from './pages/generic-page/error-service-unavailable/error-service-unavailable.component';
import { ConfirmationComponent } from './pages/generic-page/confirmation/confirmation.component';
import { CheckYourAnswersComponent } from './pages/generic-page/check-your-answers/check-your-answers.component';
import { TaskListComponent } from './pages/generic-page/task-list/task-list.component';
import { TermsAndConditionsComponent } from './pages/generic-page/terms-and-conditions/terms-and-conditions.component';
import { CookiesComponent } from './pages/generic-page/cookies/cookies.component';
import { PrivacyPolicyComponent } from './pages/generic-page/privacy-policy/privacy-policy.component';
import { DemoComponent } from './pages/generic-page/demo/demo.component';
import { CaseDataService } from './pages/view-case/view-case.services';

const routes: Routes = [
    {
        path: '',
        component: GenericPageComponent,
        children: [
            {
                path: '',
                component: DashboardComponent,
                canActivate: [AuthGuardService],
            },
            {
                path: 'demo',
                component: DemoComponent,
            },
            {
                path: 'terms-and-conditions',
                component: TermsAndConditionsComponent
            },
            {
                path: 'cookies',
                component: CookiesComponent
            },
            {
                path: 'privacy-policy',
                component: PrivacyPolicyComponent
            },
        ]
    },
    {
        path: 'case/:jur/:casetype/:case_id',
        resolve: {
            caseData: CaseResolve
        },
        children: [
            {
                path: 'decision', component: DecisionRootComponent,
                children: [
//Common routes
                    {path: 'create', component: MakeDecisionComponent},
                    {path: 'check', component: CheckDecisionComponent},
                    {path: 'check-tribunal', component: CheckDecisionComponent},
                    {path: 'check-final-decision', component: CheckDecisionComponent},
                    {path: 'decision-confirmation', component: DecisionConfirmationComponent},
//Preliminary view routes
                    {path: 'preliminary-advanced', component: MakeDecisionComponent},
                    {path: 'final-decision', component: MakeDecisionComponent},
                    {path: 'set-award-dates', component: MakeDecisionComponent},
                    {path: 'scores', component: MakeDecisionComponent},
                    {path: 'communicating-verbally', component: MakeDecisionComponent},
                    {path: 'dressing-undressing', component: MakeDecisionComponent},
                    {path: 'engaging-face', component: MakeDecisionComponent},
                    {path: 'budgeting-decisions', component: MakeDecisionComponent},
                    {path: 'managing-therapy', component: MakeDecisionComponent},
                    {path: 'managing-toilet', component: MakeDecisionComponent},
                    {path: 'moving-around', component: MakeDecisionComponent},
                    {path: 'planning-journeys', component: MakeDecisionComponent},
                    {path: 'preparing-food', component: MakeDecisionComponent},
                    {path: 'reading-signs', component: MakeDecisionComponent},
                    {path: 'taking-nutrition', component: MakeDecisionComponent},
                    {path: 'washing-bathing', component: MakeDecisionComponent},
//Financial Ramedy routes
                    {path: 'reject-reasons', component: MakeDecisionComponent},
                    {path: 'notes-for-court-administrator', component: MakeDecisionComponent},
                    {path: 'draft-consent-order', component: DraftConsentOrderComponent},
                    {path: 'hearing-details', component: MakeDecisionComponent}

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
                path: 'questions/new/:round',
                component: CreateQuestionsComponent
            },
            {
                path: 'questions/check/:round',
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
        JUIFormsModule,
        GovukModule,
        HmctsModule
    ],
    declarations: [
        DashboardComponent,
        CookiesComponent,
        PrivacyPolicyComponent,
        TermsAndConditionsComponent,
        ViewCaseComponent,
        CheckDecisionComponent,
        DecisionRootComponent,
        DecisionConfirmationComponent,
        HearingRootComponent,
        CreateHearingComponent,
        CheckHearingComponent,
        HearingConfirmationComponent,
        DemoComponent,
        MakeDecisionComponent,
        DraftConsentOrderComponent,
        GenericPageComponent,
        ErrorServiceUnavailableComponent,
        ConfirmationComponent,
        CheckYourAnswersComponent,
        TaskListComponent
    ],
    providers: [
        CaseResolve,
        RedirectionService,
        CaseDataService
    ],
    exports: [
        RouterModule
    ]
})

export class RoutingModule {
}
