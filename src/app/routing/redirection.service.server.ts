import {PLATFORM_ID, Inject, Injectable} from '@angular/core';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';
import { Response, Request } from 'express';

@Injectable({
    providedIn: 'root'
})
export class ServerRedirectionService {

    constructor(@Inject(REQUEST) private request: Request,
                @Inject(RESPONSE) private response: Response,
                @Inject(PLATFORM_ID) private platformId: string) { }

    redirect(url) {
        try {
            this.response.redirect(301, url);
            this.response.end();
        } catch (e) {}
    }
}
