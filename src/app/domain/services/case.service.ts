import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ConfigService} from '../../config.service';
import {makeStateKey, TransferState} from '@angular/platform-browser';
import {map, catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable()
export class CaseService {

    constructor(private httpClient: HttpClient,
                private configService: ConfigService,
                private state: TransferState) {
    }

    fetch(caseId, jurisdiction, casetype): Observable<Object> {
        const url = `${this.configService.config.api_base_url}/api/case/${jurisdiction}/${casetype}/${caseId}`;
        const key = makeStateKey(url);
        const cache = this.state.get(key, null as any);
        if (cache) {
            return of(cache);
        }
        return this.httpClient.get(url).pipe(map(data => {
            this.state.set(key, data);
            return data;
        }));
    }

    /**
     * getCases
     *
     * Retrieves the cases. On success we pass back the response data, on error we pass back the error response to the subscriber.
     */
    getCases(): Observable<Object> {
        const url = `${this.configService.config.api_base_url}/api/cases`;
        return this.httpClient
            .get(url)
            .pipe(map(data => data))
            .pipe(catchError(error => throwError(error)));
    }

    getNewCase(): Observable<Object> {
        const url = `${this.configService.config.api_base_url}/api/cases/assign/new`;
        const key = makeStateKey(url);
        const cache = this.state.get(key, null as any);
        if (cache) {
            return of(cache);
        }
        return this.httpClient
            .post(url, {})
            .pipe(map(data => {
                this.state.set(key, data);
                return data;
            }))
            .pipe(catchError(error => {
                const value: any = {error};
                this.state.set(key, value);
                return of(value);
            }));
    }
}
