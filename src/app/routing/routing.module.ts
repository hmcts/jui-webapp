import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { DomainModule } from '../domain/domain.module';
import { AuthGuardService } from '../auth/auth-guard.service';
import { ViewCaseComponent } from './pages/view-case/view-case.component';
import { ViewCaseFileComponent } from './pages/view-case-file/view-case-file.component';
import { HttpClientModule } from '@angular/common/http';
import { CaseService } from '../case.service';
import { CaseFileService } from '../case-file.service';

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
        path: 'viewcase/:case_id/casefile/:doc_id',
        component: ViewCaseFileComponent
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
        ViewCaseComponent,
        ViewCaseFileComponent
    ],
    providers: [
        CaseService,
        CaseFileService
    ],
    exports: [
        RouterModule
    ]
})
export class RoutingModule {
}








