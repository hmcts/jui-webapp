import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService {

    constructor(public auth: AuthService) {
    }

    canActivate(): boolean {
        if (!this.auth.isAuthenticated()) {
            this.auth.loginRedirect();
            return false;
        }
        return true;
    }
}


