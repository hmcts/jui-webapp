import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { config } from 'config'
import * as propertiesVolume from '@hmcts/properties-volume'
propertiesVolume.addTo(config)



if (environment.production) {
    enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
    platformBrowserDynamic().bootstrapModule(AppModule)
        .catch(err => {});
});
