import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {FeedbackComponent} from './pages/feedback/feedback.component';
import {SharedModule} from '../shared/shared.module';
import {DomainModule} from '../domain/domain.module';
import {LoginComponent} from './pages/login/login.component';
import {AuthGuardService} from "../auth/auth-guard.service";
import {ViewCaseComponent} from './pages/view-case/view-case.component';
import {HttpClientModule} from '@angular/common/http';
import {CaseService} from "../case.service";

const routes: Routes = [
    {path: '', component: HomeComponent, canActivate: [AuthGuardService]},
    {path: 'feedback', component: FeedbackComponent},
    {path: 'login', component: LoginComponent},
    {path: 'viewcase/:section', component: ViewCaseComponent},
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
        FeedbackComponent,
        LoginComponent,
        ViewCaseComponent
    ],
    providers: [
        CaseService
    ],
    exports: [
        RouterModule
    ]
})
export class RoutingModule {
}








