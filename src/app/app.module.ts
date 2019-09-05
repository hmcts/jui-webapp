import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { APP_ID, Inject, NgModule, PLATFORM_ID } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { DomainModule } from './domain/domain.module';
import { RoutingModule } from './routing/routing.module';
import { ConfigService } from './config.service';
import { AuthModule } from './auth/auth.module';
import { HmctsModule } from './hmcts/hmcts.module';
import { GovukModule } from './govuk/govuk.module';
import { RouterModule } from '@angular/router';

import { AppInterceptor } from './app.interceptor';
import { LoaderInterceptor } from './loader.interceptor';
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        RouterModule,
        BrowserModule.withServerTransition({ appId: 'jui' }),
        BrowserTransferStateModule,
        RoutingModule,
        HttpClientModule,
        SharedModule,
        DomainModule,
        HmctsModule,
        GovukModule,
        AuthModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AppInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoaderInterceptor,
            multi: true
        },
        ConfigService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(@Inject(PLATFORM_ID) private platformId: Object,
        @Inject(APP_ID) private appId: string) {
    }
}
