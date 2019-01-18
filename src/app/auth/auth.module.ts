import { Inject, NgModule } from '@angular/core';
import {CookieModule} from 'ngx-cookie';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {AuthInteceptor} from './auth-inteceptor';
import {CacheInteceptor} from './cache-inteceptor';
import {AuthService} from './auth.service';
import {AuthGuardService} from './auth-guard.service';
import {AuthIntercepterServer} from './auth-intercepter.server';

@NgModule({
    imports: [
        CookieModule.forRoot()
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInteceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthIntercepterServer,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CacheInteceptor,
            multi: true
        },
        AuthService,
        AuthGuardService
    ]
})
export class AuthModule {}
