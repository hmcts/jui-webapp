import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { config } from '../../config';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';
import { Response, Request } from 'express';

@Injectable({
    providedIn: 'root'
})
export class ServerConfigService {
    config = null;

    CONFIG_KEY = makeStateKey('config');

    constructor(
        public state: TransferState,
        @Inject(REQUEST) private request: Request,
        @Inject(RESPONSE) private response: Response,
        @Inject(PLATFORM_ID) private platformId: string
    ) {
        this.config = this.state.get(this.CONFIG_KEY, null as any);
        console.log("Request =>>>>>", request);
        console.log("RESPONSE =>>>>>", response);
        if (!this.config) {
            config.api_base_url = this.getBaseUrl(config);
            this.state.set(this.CONFIG_KEY, config);
            this.config = config;
        }
    }

    getBaseUrl(conf) {
        const protocol = conf.protocol;
        const host = this.request.get('host');
        return `${protocol}://${host}`;
    }
}
