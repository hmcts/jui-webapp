import { BrowserModule, BrowserTransferStateModule  } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import { FeedbackComponent } from './feedback/feedback.component';
import {EmViewerModule} from 'em-viewer-web';
import {SharedModule } from './shared/shared.module';
import {DomainModule } from './domain/domain.module';


const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'feedback', component: FeedbackComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FeedbackComponent
  ],
  imports: [
      BrowserModule.withServerTransition({ appId: 'jui' }),
      BrowserTransferStateModule,
      AppRoutingModule,
      RouterModule.forRoot(routes),
      HttpClientModule,
      EmViewerModule,
      SharedModule,
      DomainModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        @Inject(APP_ID) private appId: string) {
        const platform = isPlatformBrowser(platformId) ?
            'in the browser' : 'on the server';
        console.log(`Running ${platform} with appId=${appId}`);
    }
}
