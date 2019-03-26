import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
const config = require('@hmcts/properties-volume').addTo(require('config'),{mountPoint:'some/properties/mount/point'})

if (environment.production) {
    enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
    platformBrowserDynamic().bootstrapModule(AppModule)
        .catch(err => {});
});
