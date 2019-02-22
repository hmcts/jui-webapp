import {Component, OnInit} from '@angular/core';
import { ConfigService } from './config.service';
import {NavigationEnd, Router, Event} from '@angular/router';
import { environment } from '../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
    title = 'JUI Web App';
    config; // TODO add type

    constructor(private configService: ConfigService, private router: Router) {}

    ngOnInit() {
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                const replacedTitles = this.replacedTitles(event.url);
                this.title = this.getTitle(replacedTitles);
            }
        });

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

    private replacedTitles(url: string): string {
        if (url.indexOf('summary') !== -1) {
            return 'summary';
        }
        if (url.indexOf('parties') !== -1) {
            return 'parties';
        }
        if (url.indexOf('casefile') !== -1) {
            return 'caseFile';
        }
        if (url.indexOf('timeline') !== -1) {
            return 'timeline';
        }
        if (url.indexOf('decision') !== -1) {
            return 'decision';
        }
        if (url.indexOf('hearing') !== -1) {
            return 'listOfHearing';
        }
        if (url.indexOf('reject-reasons') !== -1) {
            return 'reject-reasons';
        }
        return '/';
    }

    private getTitle(key): string {
       const titleMapping: {[id: string]: string} = {
           '/' : 'Your cases - Judicial case manager',
           'summary': 'Summary - Judicial case manager',
           'parties': 'Parties - Judicial case manager',
           'caseFile': 'Case File - Judicial case manager',
           'timeline': 'Timeline - Judicial case manager',
           'decision' : 'Make decision - Judicial case manager',
           'listOfHearing': 'List of hearing - Judicial case manager',
       };

       return titleMapping[key];
    }
}
