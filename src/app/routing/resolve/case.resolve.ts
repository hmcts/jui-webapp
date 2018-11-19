import {Injectable} from '@angular/core';
import 'rxjs/operators/map';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {CaseService} from '../../domain/services/case.service';

@Injectable()
export class CaseResolve implements Resolve<any> {

    constructor(private caseService: CaseService) {
    }

    resolve(route: ActivatedRouteSnapshot) {
        const caseId = route.paramMap.get('case_id');
        const jurisdiction = route.paramMap.get('jur');
        const caseType = route.paramMap.get('casetype');

        return this.caseService.fetch(caseId, jurisdiction, caseType);
    }
}
