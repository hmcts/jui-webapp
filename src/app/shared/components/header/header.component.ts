import {Component} from '@angular/core';
import {AuthService} from "../../../auth/auth.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    constructor(public authService: AuthService) {
    }

    get loggedIn() {
        return this.authService.isAuthenticated();
    }

    logout() {
        this.authService.logout();
    }

}
