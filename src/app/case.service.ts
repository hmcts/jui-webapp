import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';
import {makeStateKey, TransferState} from '@angular/platform-browser';
import 'rxjs/operators/map';
import {catchError} from 'rxjs/operators';

@Injectable()
export class CaseService {

    constructor(private httpClient: HttpClient,
                private configService: ConfigService,
                private state: TransferState) {
    }

    fetch(caseId): Observable<Object> {
        const url = `${this.configService.config.api_base_url}/api/cases/${caseId}`;
        const key = makeStateKey(url);
        const cache = this.state.get(key, null as any);
        if (cache) {
            return of(cache);
        }
        return this.httpClient.get(url).map(data => {
            this.state.set(key, data);
            return data;
        });
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
            .map(data => {
                this.state.set(key, data);
                return data;
            })
            .pipe(catchError(error => {
                const value: any = {error};
                this.state.set(key, value);
                return of(value);
            }));
    }
}
