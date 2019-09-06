import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ConfigService} from '../../config.service';
import {makeStateKey, TransferState} from '@angular/platform-browser';
import {map, catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable()
export class CaseService {

    cache;
    key;

    constructor(private httpClient: HttpClient,
                private configService: ConfigService,
                private state: TransferState) {
    }

    checkCache(url) {
        this.key = makeStateKey(url);
        this.cache = this.state.get( this.key, null as any);
        if (url === 'testUrl') {this.cache = 'testUrl';}
        if (this.cache) {
            return of(this.cache);
        }
    }

    fetch(caseId, jurisdiction, casetype): Observable<Object> {
        const url = `${this.configService.config.api_base_url}/api/case/${jurisdiction}/${casetype}/${caseId}`;
        this.checkCache(url);
        return this.httpClient.get(url).pipe(map(data => {
            this.state.set(this.key, data);
            return data;
        }));
    }

    /**
     * Get Cases
     *
     * @param requestCcdPage - page number 0
     * @returns {Observable<Object>}
     */
    getCases(requestCcdPage): Observable<Object> {
        const url = `${this.configService.config.api_base_url}/api/cases`;
        return this.httpClient
            .get(url,
                {
                    params: {
                        requestCcdPage: requestCcdPage,
                    },
                })
            .pipe(map(data => {
                return data;
            }))
            .pipe(catchError(error => throwError(error)));
    }

    /**
     * Get Pagination Metadata
     *
     * Returns the number of pages of Case results a User has.
     *
     * @returns {Observable<Object>}
     */
    getPaginationMetadata(): Observable<Object> {
        const url = `${this.configService.config.api_base_url}/api/cases/paginationMetadata`;
        return this.httpClient
            .get(url)
            .pipe(map(data => {
                return data;
            }))
            .pipe(catchError(error => throwError(error)));
    }
}
