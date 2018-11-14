import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/filter';
import {PageDateCase} from '../../../domain/models/section_fields';
import {CaseDataService} from './view-case.services';

export interface LinkItem {
    href: string;
    text: string;
    label: string;
    id: string;
    active: Boolean;
}
@Component({
    selector: 'app-view-case',
    templateUrl: './view-case.component.html',
    styleUrls: ['./view-case.component.scss']
})
export class ViewCaseComponent implements OnInit {

    public case: PageDateCase;
    public caseid: string;
    public links: Array<LinkItem> = [];
    public sectionId: string;
    public targetSection: string | null;

    constructor(public router: Router, private route: ActivatedRoute, private caseDataService: CaseDataService) {
        this.route.params.subscribe(params => this.sectionId = params.section || null);
    }

    ngOnInit() {
        this.case = this.caseDataService.getCaseData();
        if (this.case) {
            this.links = this.caseDataService.getNavigation(this.case);
            this.case.sections.find(section => section.id === this.sectionId);
        }
        if (!this.targetSection) {
            if (this.links[0]) {
                this.router.navigate([this.links[0].id], {relativeTo: this.route})
                    .catch(err => {
                            console.error(err);
                            this.router.navigate(['']);
                        }
                    );
            } else {
                this.router.navigate(['']);
            }
        }
    }

}
