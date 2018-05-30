import {Inject, Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie';
import {JwtDecodeService} from './jwtDecode.service';
import {IdamAuth} from './idamAuthToken.model';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {DOCUMENT} from '@angular/common';
import {Router} from '@angular/router';
import {JwtUserModelModel} from './jwtUserModel.model';
import {ConfigService} from '../config/config.service';
import {v4 as uuid} from 'uuid';

@Injectable({
    providedIn: 'root'
})
export class SessionService {

    public static readonly KEY = '__auth-token';
    public static readonly SESSION_LIFESPAN: number = 8 * 60 * 60 * 1000;

    constructor(
        private router: Router,
        private cookieService: CookieService,
        private http: HttpClient,
        @Inject(DOCUMENT) private document: any,
        private appConfig: ConfigService
    ) {
    }



    logout() {
        this.clearSession();
        window.location.reload();
    }

    isAuthenticated() {
        return this.getDecodedSession();
    }

    /////////////////////////////
    // Session CRUD
    /////////////////////////////
    getSession(): any {
        let authToken: any = null;
        try {
            authToken = this.cookieService.get(SessionService.KEY);
        } catch (e) {
            console.log(`No Cookie Found for ${SessionService.KEY} To Be Retrieve`);
        }

        if (!authToken) {
            this.clearSession();
        } else {
            return authToken;
        }
    }

    saveSession(authToken: IdamAuth) {
        const expiresAt: Date = new Date();
        expiresAt.setTime(expiresAt.getTime() + SessionService.SESSION_LIFESPAN);
        this.cookieService.put(SessionService.KEY, authToken.access_token, {
            expires: expiresAt
        });
    }

    clearSession() {
        try {
            this.cookieService.remove(SessionService.KEY);
        } catch (e) {
            console.log(`No Cookie Found for ${SessionService.KEY} To Be Removed`);
        }
    }


    /////////////////////////////
    // Get Session Details
    /////////////////////////////
    getDecodedSession(): JwtUserModelModel {
        const session = this.getSession();
        if (session) {
            try {
                return JwtDecodeService.decode(session);
            } catch (e) {
                console.log('somthing went wrong decoding session');
            }
        }
        return null;
    }

    getUID(): string {
        const decodedSession = this.getDecodedSession();
        return (decodedSession) ? decodedSession.id : null;
    }

    getForename(): string {
        const decodedSession = this.getDecodedSession();
        return (decodedSession) ? decodedSession.forename : null;
    }

    getSurname(): string {
        const decodedSession = this.getDecodedSession();
        return (decodedSession) ? decodedSession.surname : null;
    }




    getAccessToken(code: string, state: string): Observable<IdamAuth> {
        if (code) {
            return this.http.get<IdamAuth>(this.getOauthTokenUrl(
                this.appConfig.getOauth2CallbackTokenEndpointBackend(),
                code,
                state,
                this.getRedirectUrl()
            ));
        } else {
            console.error('Error: Unable to obtain access token - no OAuth2 code provided');
        }
    }

    getRedirectUrl(): string {
        return this.document.location.origin + this.appConfig.getOauth2CallbackTokenEndpoint();
    }

    getOauthLoginUrl(loginUrl: string = this.appConfig.getLoginUrl(),
                     state: string = uuid(),
                     clientId: string = this.appConfig.getOauth2ClientId(),
                     redirectUri: string = encodeURIComponent(this.getRedirectUrl())
    ): string {
        return `${loginUrl}?response_type=code&state${state}&client_id=${clientId}&redirect_uri=${redirectUri}`;
    }

    getOauthTokenUrl(url: string, code: string, state: string, redirectUri: string): string {
        return `${url}?code=${code}&state=${state}&redirect_uri=${redirectUri}`;
    }
}
