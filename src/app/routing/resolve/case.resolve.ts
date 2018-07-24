import {Injectable} from '@angular/core';
import 'rxjs/operators/map';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {CaseService} from '../../case.service';

@Injectable()
export class CaseResolve implements Resolve<any> {

    constructor(private caseService: CaseService) {
    }

    resolve(route: ActivatedRouteSnapshot) {
        return this.caseService.fetch(route.paramMap.get('case_id'));
    }
}
