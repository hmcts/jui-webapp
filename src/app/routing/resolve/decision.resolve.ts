import {Injectable} from '@angular/core';
import {of} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {DecisionService} from '../../domain/services/decision.service';

@Injectable()
export class DecisionResolve implements Resolve<any> {

    constructor(private decisionService: DecisionService) {
    }

    resolve(route: ActivatedRouteSnapshot) {
        console.log('resolve');
        return this.decisionService.fetch(route.paramMap.get('case_id'))
            .pipe(catchError(error => {
                console.log(error);
                return of(null);
            }));
    }
}
