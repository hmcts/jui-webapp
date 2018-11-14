import {Inject, Injectable} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LinkItem} from './view-case.component';

@Injectable()
export class CaseDataService {

    constructor(private route: ActivatedRoute) {}

    getCaseData() {
       return this.route.snapshot.data['caseData'];
    }
    getNavigation(obj): Array<LinkItem> {
        const sectionId = this.route.params.subscribe(params => params.section ? params.section : null);
        return obj.sections.map(item => {
            return {
                href: `/case/${obj.case_jurisdiction}/${obj.case_type_id}/${obj.id}/${item.id}`,
                text: item.name,
                label: item.name,
                id: item.id,
                active:  sectionId === item.id
            };
        });
    }
}
