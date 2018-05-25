import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
// import {filter} from 'rxjs/operators';
import 'rxjs/add/operator/filter';
import {CaseService} from "../../../case.service";


@Component({
    selector: 'app-view-case',
    templateUrl: './view-case.component.html',
    styleUrls: ['./view-case.component.scss']
})
export class ViewCaseComponent implements OnInit {

    case: any;

    bob: string;
    links = []

    constructor(public router: Router, private caseService: CaseService) {

    }

    ngOnInit() {
        this.caseService.fetch().subscribe(data => {
            this.case = data;
            this.links = this.case.sections.map(section => {
                // this.createCaseRoutes(section);
                return {
                    href: `/viewcase/${section.id}`,
                    label: section.name
                }
            });


        });




        this.bob = this.router.url.replace('/viewcase/', '');
        // console.log(this.router);
        // this.case = JSON.parse('{"sections":[{"id":"summary","name":"Summary","type":"section","sections":[{"id":"case_details","name":"Case Details","type":"panel","fields":[{"label":"Parties","value":[1522058425067027]},{"label":"Case number","value":[1522058425067027]},{"label":"Case type","value":["Benefit"]}]}]},{"id":"parties","name":"Parties","type":"section","sections":[{"id":"case_details","name":"Case Details","type":"panel","fields":[{"label":"Parties","value":[1522058425067027]}]}]},{"id":"casefile","name":"Case file","type":"section","sections":[{"id":"case_details","name":"Case Details","type":"panel","fields":[{"label":"Parties","value":[1522058425067027]}]}]}]}');

        // this.case = {
        //     sections: [
        //         {
        //             id: 'summary',
        //             name: 'Summary'
        //         },
        //         {
        //             id: 'parties',
        //             name: 'Parties'
        //         },
        //         {
        //             id: 'casefile',
        //             name: 'Case file'
        //         }
        //     ]
        // };



        this.router.events.filter(event => event instanceof NavigationEnd)
            .subscribe((event: NavigationEnd) => {
                this.bob = event.url.replace('/viewcase/', '');
                // console.log(event);
                // You only receive NavigationStart events
            });
    }

}
