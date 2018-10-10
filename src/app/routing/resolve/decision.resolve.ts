import {Injectable} from '@angular/core';
import {of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {DecisionService} from '../../domain/services/decision.service';

@Injectable()
export class DecisionResolve implements Resolve<any> {

    constructor(private decisionService: DecisionService) {
    }

    resolve(route: ActivatedRouteSnapshot) {
        // const caseId = route.paramMap.get('case_id');
        // const jurisdiction = route.paramMap.get('jur');
        // const caseType = route.paramMap.get('casetype');
        // return this.decisionService.fetch(jurisdiction, caseId, ).pipe(catchError(error => {
        //         console.log(error);
        //         return of(null);
        // }));
    }
}
