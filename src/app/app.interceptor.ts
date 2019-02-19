import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/do';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth/auth.service';

import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AppInterceptor implements HttpInterceptor {

    constructor(public router: Router, private authService: AuthService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(tap(event => {
            if (event instanceof HttpResponse) {
                // handle generic success
            }
        }, error => {
            // handle generic error
        }));
    }
}
