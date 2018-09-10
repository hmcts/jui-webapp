import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Injectable} from '@angular/core';
import {HearingService} from '../../domain/services/hearing.service';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';


@Injectable()
export class HearingResolve implements Resolve<any> {

    constructor(private hearingService: HearingService) {}

    resolve(route: ActivatedRouteSnapshot): any {
        return this.hearingService
            .fetch(route.paramMap.get('case_id'))
            .pipe(catchError(error => {
                console.log(error);
                return of(null);
        }));
    }

}
