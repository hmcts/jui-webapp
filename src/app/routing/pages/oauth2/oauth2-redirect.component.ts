import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {SessionService} from '../../../auth/session.service';

@Component({
    templateUrl: './oauth2-redirect.html',
    styleUrls: [
        './oauth2-redirect.scss'
    ]
})
export class OAuth2RedirectComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private sessionService: SessionService
    ) {}
    ngOnInit(): void {
        this.sessionService.getAccessToken(
            this.route.snapshot.queryParams.code,
            this.route.snapshot.queryParams.state
        ).subscribe(token => {
            console.dir(token);
            this.sessionService.saveSession(token);
            this.router.navigate(['/'], { replaceUrl: true });
        }, error => {
            console.error(error);
        });
    }
}
