import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from "ngx-cookie";
import * as jwtDecode from 'jwt-decode';
import config from '../../../config';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    readonly COOKIE_KEY: string = config.cookieName;

    constructor(public router: Router, private cookieService: CookieService) {
    }

    createLoginUrl() {
        //Base url plus callback url

    }

    login() {
        console.log('login');
        // localStorage.setItem('LOGGED_IN', 'true');
        // this.router.navigate(['']);
    }

    logout() {
        localStorage.removeItem('LOGGED_IN');
        this.router.navigate(['login']);
    }

    isAuthenticated(): boolean {
        if(localStorage.getItem('bob')) {
            console.log('isAuthenticated');
            const jwt = this.cookieService.get(this.COOKIE_KEY);
            console.log(jwt);
            if(!jwt) return false;
            const jwtData = jwtDecode(jwt);
            console.log(jwtData);
            // if(jwtData) return false;
            const expired = jwtData.exp > new Date().getTime();
            // do stuff!!
            return !expired;
        }
        else {
            localStorage.setItem('bob', 'true');
            return false;
        }

    }
}
