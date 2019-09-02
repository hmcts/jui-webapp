import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
/* istanbul ignore next */
import { Observable } from 'rxjs';

/* istanbul ignore next */
@Injectable({
    providedIn: 'root'
})
export class LoaderInterceptorServiceMock {

    constructor(private http: HttpClient) { }

    getMock(): Observable<any> {
        return this.http.get('/test');
    }
}
