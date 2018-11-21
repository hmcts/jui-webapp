import {Injectable} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Params} from '@angular/router/src/shared';
import {Observable} from 'rxjs';
import {LinkItem} from '../../../domain/models/section_fields';

@Injectable()
export class CaseDataService {

    constructor(private route: ActivatedRoute) {
    }

    getCaseData() {
        // Not able to return ActivatedRoute via service
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
                active: sectionId === item.id
            };
        });
    }
}
