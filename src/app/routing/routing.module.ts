import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {FeedbackComponent} from './pages/feedback/feedback.component';
import {SharedModule} from '../shared/shared.module';
import {DomainModule} from '../domain/domain.module';
import {ViewCaseComponent} from './pages/view-case/view-case.component';
import {HttpClientModule} from '@angular/common/http';
import {CaseService} from "../case.service";
import {AuthGuardService} from '../auth/auth-guard.service';
import {OAuth2RedirectComponent} from './pages/oauth2/oauth2-redirect.component';

const routes: Routes = [
    {path: '', component: HomeComponent, canActivate: [AuthGuardService]},
    {path: 'feedback', component: FeedbackComponent},
    {path: 'oauth2/callback', component: OAuth2RedirectComponent},
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
        ViewCaseComponent,
        OAuth2RedirectComponent
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








