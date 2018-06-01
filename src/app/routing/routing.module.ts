import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { DomainModule } from '../domain/domain.module';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuardService } from '../auth/auth-guard.service';
import { ViewCaseComponent } from './pages/view-case/view-case.component';
import { HttpClientModule } from '@angular/common/http';
import { CaseService } from '../case.service';
import { CasesService } from '../cases.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'viewcase/:case_id/:section',
    component: ViewCaseComponent
  },
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
    LoginComponent,
    ViewCaseComponent
  ],
  providers: [
    CasesService,
    CaseService
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule {
}








