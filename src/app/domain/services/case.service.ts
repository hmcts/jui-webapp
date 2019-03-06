import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../config.service';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { map, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CaseService {

    private subject = new Subject<any>();

    constructor(private httpClient: HttpClient,
        private configService: ConfigService,
        private state: TransferState) {
    }

    newEvent(event) {
        this.subject.next(event);
    }

    get events () {
        return this.subject.asObservable();
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

    search(): Observable<Object> {
        const url = `${this.configService.config.api_base_url}/api/cases`;
        return this.httpClient
            .get(url)
            .pipe(map(data => {
                return data;
            }))
            .pipe(catchError((error: any) => {
                const value: any = {error};
                return of(value);
            }));
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
                const value: any = { error };
                this.state.set(key, value);
                return of(value);
            }));
    }
}
