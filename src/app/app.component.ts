import { Component, OnInit } from '@angular/core';
import { ConfigService } from './config.service';
import { NavigationEnd, Router, Event } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
    title = 'JUI Web App';
    urls = ['summary', 'parties', 'casefile', 'timeline', 'decision', 'hearing', 'reject-reasons'];
    config; // TODO add type

    constructor(private configService: ConfigService, private router: Router) { }

    ngOnInit() {
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                const replacedTitles = this.replacedTitles(event.url);
                this.title = this.getTitle(replacedTitles);
            }
        });

    }

    replacedTitles(url: string): string {
        for ( const page of this.urls ){
            if (url.indexOf(page) !== -1) {
                return page;
            }
        }
        return '/';
    }

    getTitle(key): string {
        const titleMapping: { [id: string]: string } = {
            '/': 'Your cases - Judicial case manager',
            'summary': 'Summary - Judicial case manager',
            'parties': 'Parties - Judicial case manager',
            'caseFile': 'Case File - Judicial case manager',
            'timeline': 'Timeline - Judicial case manager',
            'decision': 'Make decision - Judicial case manager',
            'listOfHearing': 'List of hearing - Judicial case manager',
        };

        return titleMapping[key];
    }
}
