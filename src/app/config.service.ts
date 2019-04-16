import { Inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { configs, baseConfig } from '../../config';
import { DOCUMENT } from '@angular/common';
@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    config = null;
    CONFIG_KEY = makeStateKey('config');
    constructor(
        private state: TransferState,
        private cookieService: CookieService,
        @Inject(DOCUMENT) private document: any
    ) {
        this.config = this.state.get(this.CONFIG_KEY, null as any);
        if (!this.config) {
            const config: any = { ...baseConfig };
            const platform = this.cookieService.get(config.platformCookie) || config.localEnv;
            if (configs[platform].default.protocol) {
                config.protocol = configs[platform].default.protocol;
            }
            config.services = configs[platform].default.services;
            config.api_base_url = this.getBaseUrl(config);
            this.state.set(this.CONFIG_KEY, config);
            this.config = config;
        }
    }
    getBaseUrl(configData) {
        return `${configData.protocol}://${this.document.location.host}`;
    }
}
