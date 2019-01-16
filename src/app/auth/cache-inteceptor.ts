import {Injectable} from '@angular/core';
import 'rxjs/add/operator/do';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
    providedIn: 'root'
})
export class CacheInteceptor implements HttpInterceptor  {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (request.url && request.url.includes('/api/')) {
            request = request.clone({
                headers: new HttpHeaders({
                    'Cache-control': ['no-cache', 'no-store', 'must-revalidate'],
                    'Pragma': 'no-cache',
                    'Expires': '0'
                })
            });
        }

        return next.handle(request);
    }
}
