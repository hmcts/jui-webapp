import {Inject, Injectable} from '@angular/core';
import {makeStateKey, TransferState} from '@angular/platform-browser';
declare function require(name: string);
const config = require('../../config');
import {DOCUMENT} from '@angular/common';

@Injectable()
export class ConfigService {

    config = null;

    CONFIG_KEY = makeStateKey('config');

    constructor(private state: TransferState, @Inject(DOCUMENT) private document: any) {
        this.config = this.state.get(this.CONFIG_KEY, null as any);
        if (!this.config) {
            this.state.set(this.CONFIG_KEY, config);
            this.config = config;
            this.config.api_base_url = this.getBaseUrl();
        }
    }

    getBaseUrl() {
        return `${this.document.location.protocol}//${this.document.location.host}`;
    }
}
