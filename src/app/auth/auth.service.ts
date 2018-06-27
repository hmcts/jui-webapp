import {Inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from "ngx-cookie";
import * as jwtDecode from 'jwt-decode';
import {ConfigService} from "../config.service";
import {DOCUMENT} from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    COOKIE_KEYS;

    constructor(public router: Router,
                private configService: ConfigService,
                private cookieService: CookieService,
                @Inject(DOCUMENT) private document: any) {
        this.COOKIE_KEYS = {
            TOKEN: this.configService.config.cookies.token,
            USER: this.configService.config.cookies.userId
        };
    }

    generateLoginUrl() {
        const base = this.configService.config.services.idam_web;
        const clientId = this.configService.config.idam_client;
        const callback = this.configService.config.oauth_callback_url;
        return `${base}?response_type=code&client_id=${clientId}&redirect_uri=${callback}`;
    }

    getAuthHeaders() {
        interface HeaderObject {
            [key: string]: string
        }
        const headers: HeaderObject = {
            Authorization: this.cookieService.get(this.COOKIE_KEYS.TOKEN),
            [this.COOKIE_KEYS.USER]: this.cookieService.get(this.COOKIE_KEYS.USER),
        };
        return headers;
    }

    loginRedirect() {
        this.document.location.href = this.generateLoginUrl();
    }

    logout() {
        this.cookieService.removeAll();
        this.loginRedirect();
    }

    decodeJwt(jwt) {
        return jwtDecode(jwt);
    }

    isAuthenticated(): boolean {
        const jwt = this.cookieService.get(this.COOKIE_KEYS.TOKEN);
        if (!jwt) return false;
        const jwtData = this.decodeJwt(jwt);
        const expired = jwtData.exp > new Date().getTime();
        // do stuff!!
        return !expired;
    }
}
