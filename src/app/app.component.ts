import { Component, OnInit, Inject, Renderer2, NgZone } from '@angular/core';
import { ConfigService } from './config.service';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { LoaderService } from './loader.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'JUI Web App';
    urls = ['summary', 'parties', 'casefile', 'timeline', 'decision', 'hearing', 'reject-reasons'];
    config; // TODO add type
    loadingClass = 'jui-loading';

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private configService: ConfigService,
        private router: Router,
        private renderer: Renderer2,
        private ngZone: NgZone,
        private loaderService: LoaderService
    ) {
        this.loaderService.isLoading.subscribe( state => {
            this.loading = state;
        });
    }

    ngOnInit() {
        this.router.events.subscribe((event: RouterEvent) => {
            if (event instanceof NavigationEnd) {
                const replacedTitles = this.replacedTitles(event.url);
                this.title = this.getTitle(replacedTitles);
            }
        });

    }

    set loading(load: boolean) {
        this.ngZone.runOutsideAngular(() => {
            if (load) {
                this.renderer.addClass(this.document.body, this.loadingClass);
            } else {
                this.renderer.removeClass(this.document.body, this.loadingClass);
            }
        });
    }

    replacedTitles(url: string): string {
        for ( const page of this.urls ) {
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
