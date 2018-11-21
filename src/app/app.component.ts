import {Component, OnInit} from '@angular/core';
import { ConfigService } from './config.service';
import {NavigationEnd, Router} from '@angular/router';
import { environment } from '../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
    title = 'JUI Web App';

    config;

    constructor(private configService: ConfigService, private router: Router) {
        // this.config = configService.config;
        // this.router.events.subscribe(event => {
        //     if (event instanceof NavigationEnd) {
        //         (<any>window).ga('set', 'page', event.urlAfterRedirects);
        //         (<any>window).ga('send', 'pageview');
        //     }
        // });
    }

    ngOnInit() {
        if (environment.googleAnalyticsKey) {
            // this.appendGaTrackingCode(); // TODO: fix analytics
        }
    }

    private appendGaTrackingCode() {
        try {
            const script = document.createElement('script');
            script.innerHTML = `(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
            ga('create', '${environment.googleAnalyticsKey}', 'auto');`;
            document.head.appendChild(script);
        } catch (ex) {
            console.error('Error appending google analytics');
            console.error(ex);
        }
    }
}
