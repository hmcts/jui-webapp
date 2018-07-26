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
        console.log(this.request.body)
        return this.request.body;
    }


}
