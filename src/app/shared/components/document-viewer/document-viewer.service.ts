import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {makeStateKey, TransferState} from '@angular/platform-browser';
import {map, catchError} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DocumentViewerService {

    constructor(private httpClient: HttpClient,
                private state: TransferState) {

    }

    fetch(documentUri): Observable<any> {
        const key = makeStateKey(documentUri);
        const cache = this.state.get(key, null as any);
        if (cache) {
            return of(cache);
        }
        return this.httpClient
            .get(documentUri)
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
