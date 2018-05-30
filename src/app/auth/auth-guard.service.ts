import {Inject, Injectable} from '@angular/core';
import {SessionService} from './session.service';
import {CanActivate} from '@angular/router';
import {DOCUMENT} from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    constructor(
        private sessionService: SessionService,
        @Inject(DOCUMENT) private document: any,
    ) { }

    canActivate(): boolean {
        if (!!(this.sessionService.isAuthenticated())) {
            return true;
        } else {
            this.document.location.href = this.sessionService.getOauthLoginUrl();
            return false;
        }
    }
}
