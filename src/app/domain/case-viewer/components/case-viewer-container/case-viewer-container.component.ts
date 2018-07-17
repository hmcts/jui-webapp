import {Component, OnChanges, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-case-viewer-container',
    templateUrl: './case-viewer-container.component.html',
    styleUrls: ['./case-viewer-container.component.scss']
})
export class CaseViewerContainerComponent implements OnInit{

    case: any;
    caseid: string;
    links = [];
    sectionId: string;
    targetSection: any;

    constructor(private router: Router, private route: ActivatedRoute) {
        this.route.parent.params.subscribe( params => this.caseid = params.case_id || null);
        this.route.params.subscribe( params => this.sectionId = params.section || null);
    }

    ngOnInit() {
        this.case = this.route.parent.snapshot.data['caseData'];

        if (this.case) {
            this.links = this.case.sections.map(section => {
                return {
                    href: `/viewcase/${this.caseid}/${section.id}`,
                    label: section.name,
                    id: section.id
                };
            });
        }

        this.targetSection = (this.case) ? this.case.sections.find(section => section.id === this.sectionId) : null;


        if (!this.targetSection) {
            if (this.links[0]) {
                this.router.navigate([ this.links[0].id], {relativeTo: this.route})
                    .then(
                        nav => {
                            console.log(nav);
                        }, err => {
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
