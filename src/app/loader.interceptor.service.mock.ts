import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoaderInterceptorServiceMock {

    constructor(private http: HttpClient) { }

    getMock(): Observable<any> {
        return this.http.get('/test');
    }
}
