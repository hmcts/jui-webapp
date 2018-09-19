import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ConfigService} from '../../config.service';
import {makeStateKey, TransferState} from '@angular/platform-browser';
import {map} from 'rxjs/operators';
import {catchError} from 'rxjs/operators';

@Injectable()
export class AnnotationService {

    constructor(private httpClient: HttpClient,
                private configService: ConfigService,
                private state: TransferState) {
    }

    fetch(documentUrl): Observable<Object> {
        const url = `${this.configService.config.api_base_url}/api/annotation-sets/filter`;
        const key = makeStateKey(url);
        const cache = this.state.get(key, null as any);
        if (cache) {
            return of(cache);
        }
        const params = new HttpParams().set('url', documentUrl);
        return this.httpClient.get(url, { params: params }).pipe(map(data => {
            const firstAnnotationSet = null;
            // if (data._embedded && data._embedded.annotationSets && data._embedded.annotationSets.length > 0) {
            //     // firstAnnotationSet = data._embedded.annotationSets[0];
            //     // this.state.set(key, firstAnnotationSet);
            // } else {
            //     //CREATE ANNOTATION SET
            // }
            return firstAnnotationSet;
        }));
    }

    update(annotationSet): Observable<Object> {
        return null;
    }

}
