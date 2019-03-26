import { application } from './application.config';

import * as local from './environments/local.config';
import * as docker from './environments/docker.config';
import * as spreview from './environments/spreview.config';
import * as saat from './environments/saat.config';
import * as sprod from './environments/sprod.config';
import * as preview from './environments/preview.config';
import * as demo from './environments/demo.config';
import * as aat from './environments/aat.config';
import * as prod from './environments/prod.config';
import * as mock from './environments/mock.config';
import * as sandbox from './environments/sandbox.config';
import * as process from 'process';

export const configs = {
    local,
    docker,
    spreview,
    saat,
    sprod,
    preview,
    demo,
    aat,
    prod,
    mock,
    sandbox
};

export const configEnv = process ? process.env.JUI_ENV || 'local' : 'local';
export const baseConfig = { ...application };
export const config = { ...baseConfig, ...configs[configEnv].default };



if (process) {
    config.appInsightsInstrumentationKey =
        process.env.APPINSIGHTS_INSTRUMENTATIONKEY || 'AAAAAAAAAAAAAAAA';
}



