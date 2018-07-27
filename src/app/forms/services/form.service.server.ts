import {PLATFORM_ID, Inject, Injectable} from '@angular/core';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';
import { isPlatformBrowser } from '@angular/common';
import { Response, Request } from 'express';

@Injectable({
    providedIn: 'root'
})
export class ServerFormService {

    constructor(@Inject(REQUEST) private request: Request,
                @Inject(RESPONSE) private response: Response,
                @Inject(PLATFORM_ID) private platformId: string) {

    }

    getFormValues() {
        const method = this.request.method.toLowerCase();
        const hasBody = method === 'post' || method === 'put';
        return hasBody ? this.request.body : null;
    }
}
