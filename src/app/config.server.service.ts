import {APP_ID, Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {makeStateKey, TransferState} from '@angular/platform-browser';

declare function require(name: string);
const config = require('../../config');
console.log('********************', config)

@Injectable()
export class ConfigService {

    config = null;

    CONFIG_KEY = makeStateKey('config');

    constructor(private state: TransferState) {


        console.log('server time', config)

        this.config = this.state.get(this.CONFIG_KEY, null as any);
        console.log(this.config);
        if (!this.config) {
            console.log('config value - ', config);


            this.state.set(this.CONFIG_KEY, config);

            console.log('CONFIG SET!!!!!!!');
            console.log('config value - ', this.state.get(this.CONFIG_KEY, null as any))
            this.config = config;
        }

        // isPlatformBrowser(platformId)
    }
}
