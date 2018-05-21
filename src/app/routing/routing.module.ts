import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {FeedbackComponent} from './pages/feedback/feedback.component';
import {SharedModule} from '../shared/shared.module';
import {DomainModule} from '../domain/domain.module';
import { LoginComponent } from './pages/login/login.component';
import {AuthGuardService} from "../auth/auth-guard.service";

const routes: Routes = [
    {path: '', component: HomeComponent, canActivate:[AuthGuardService]},
    {path: 'feedback', component: FeedbackComponent},
    {path: 'login', component: LoginComponent}
];


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes),
        SharedModule,
        DomainModule
    ],
    declarations: [
        HomeComponent,
        FeedbackComponent,
        LoginComponent
    ],
    exports: [
        RouterModule
    ]
})
export class RoutingModule {
}

