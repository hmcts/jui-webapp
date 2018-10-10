import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '../../config.service';
import {makeStateKey, TransferState} from '@angular/platform-browser';
import {map} from 'rxjs/operators';
import {catchError} from 'rxjs/operators';

@Injectable()
export class CaseService {

    constructor(private httpClient: HttpClient,
                private configService: ConfigService,
                private state: TransferState) {
    }

    fetch(caseId, jurisdiction, casetype): Observable<Object> {
        const url = `${this.configService.config.api_base_url}/api/cases/jurisdiction/${jurisdiction}/casetype/${casetype}/${caseId}`;
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
        const key = makeStateKey(url);
        const cache = this.state.get(key, null as any);
        if (cache) {
            return of(cache);
        }
        return this.httpClient
            .get(url)
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

    getJurisdictions() : Observable<Object> {
        const url = `${this.configService.config.api_base_url}/api/cases/jurisdictions`;
        const key = makeStateKey(url);
        const cache = this.state.get(key, null as any);
        if (cache) {
            return of(cache);
        }
        return this.httpClient
            .get(url)
            .pipe(map(data => {
                console.log("getJurisdictions() data >>>>", data);
                this.state.set(key, data);
                return data;
            }))
            .pipe(catchError(error => {
                const value: any = {error};
                this.state.set(key, value);
                return of(value);
            }));
    }

    getNewCase(selectedJurisdictionCaseType) : Observable<Object> {

        let jurisdiction = selectedJurisdictionCaseType.split('_')[0];
        let caseType = selectedJurisdictionCaseType.split('_')[1];
        const url = `${this.configService.config.api_base_url}/api/cases?jurisdiction=${jurisdiction}&caseType=${caseType}`;
        const key = makeStateKey(url);
        const cache = this.state.get(key, null as any);
        if (cache) {
            return of(cache);
        }
        return this.httpClient
            .get(url)
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
