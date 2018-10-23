import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
    selector: 'app-view-case',
    templateUrl: './view-case.component.html',
    styleUrls: ['./view-case.component.scss']
})
export class ViewCaseComponent implements OnInit {

    case: any;
    caseid: string;
    links = [];
    sectionId: string;
    targetSection: any;

    constructor(public router: Router, private route: ActivatedRoute) {
        this.route.params.subscribe(params => this.sectionId = params.section || null);
    }

    clearFocus(event) {
        const target = event.target || event.srcElement || event.currentTarget;
        target.blur();
    }

    ngOnInit() {
        this.case = this.route.snapshot.data['caseData'];
        if (this.case) {
            this.links = this.case.sections.map(section => {
                return {
                    href: `/case/${this.case.case_jurisdiction}/${this.case.case_type_id}/${this.case.id}/${section.id}`,
                    text: section.name,
                    label: section.name,
                    id: section.id,
                    active: this.sectionId === section.id
                };
            });
        }
        this.targetSection = (this.case) ? this.case.sections.find(section => section.id === this.sectionId) : null;
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
