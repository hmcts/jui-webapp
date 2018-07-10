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
import {CaseDecisionComponent} from '../domain/case-viewer/components/case-decision/case-decision.component';
import {ListForHearingComponent} from '../domain/case-viewer/components/list-for-hearing/list-for-hearing.component';

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
                path: 'make-decision',
                component: CaseDecisionComponent
            },
            {
                path: 'list-for-hearing',
                component: ListForHearingComponent
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








