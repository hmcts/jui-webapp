import {Component, Input, OnInit} from '@angular/core';
import {SessionService} from '../../auth/session.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    @Input()
    title = 'Unknown WebApp';

    constructor(public authService: SessionService) {}

    ngOnInit(): void {}

    get idamId(): string {
        return this.authService.getUID();
    }

    get idamForename(): string {
        return this.authService.getForename();
    }

    get idamSurname(): string {
        return this.authService.getSurname();
    }

    logout() {
        this.authService.logout();
    }

}
