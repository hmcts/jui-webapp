import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {makeStateKey, TransferState} from '@angular/platform-browser';
declare function require(name: string);
const config = require('../../config');
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';
import { isPlatformBrowser } from '@angular/common';
import { Response, Request } from 'express';

@Injectable()
export class ServerConfigService {

    config = null;

    CONFIG_KEY = makeStateKey('config');

    constructor(private state: TransferState, @Inject(REQUEST) private request: Request,
                @Inject(RESPONSE) private response: Response,
                @Inject(PLATFORM_ID) private platformId: string) {
        this.config = this.state.get(this.CONFIG_KEY, null as any);
        if (!this.config) {
            this.state.set(this.CONFIG_KEY, config);
            this.config = config;
            this.config.api_base_url = this.getBaseUrl();
        }
    }

    getBaseUrl() {
        const protocol = this.request.protocol;
        const host = this.request.get('host');
        return `${protocol}://${host}`;
    }
}
