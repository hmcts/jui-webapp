import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(public router: Router) {
    }

    login() {
        localStorage.setItem('LOGGED_IN', 'true');
        this.router.navigate(['']);
    }

    logout() {
        localStorage.removeItem('LOGGED_IN');
        this.router.navigate(['login']);
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem('LOGGED_IN');
    }
}
