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
import { RedirectionService} from './redirection.service';
import {CaseViewerComponent} from '../domain/case-viewer/components/case-viewer/case-viewer.component';
import {DecisionMakeComponent} from '../domain/case-viewer/components/decision-make/decision-make.component';
import {HearingMakeComponent} from '../domain/case-viewer/components/hearing-make/hearing-make.component';
import {DecisionCheckComponent} from '../domain/case-viewer/components/decision-check/decision-check.component';
import {DecisionConfirmationComponent} from '../domain/case-viewer/components/decision-confirmation/decision-confirmation.component';
import {HearingCheckComponent} from '../domain/case-viewer/components/hearing-check/hearing-check.component';
import {HearingConfirmationComponent} from '../domain/case-viewer/components/hearing-confirmation/hearing-confirmation.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'viewcase/:case_id',
        component: ViewCaseComponent,
        children: [
            {
                path: '',
                component: CaseViewerComponent
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
                path: 'decision-confirmation',
                component: DecisionConfirmationComponent
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
                path: 'hearing-confirmation',
                component: HearingConfirmationComponent
            },
            {
                path: ':section',
                component: CaseViewerComponent
            },
            {
                path: ':section/:section_item_id',
                component: CaseViewerComponent
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
        CaseFileService,
        RedirectionService
    ],
    exports: [
        RouterModule
    ]
})
export class RoutingModule {
}








