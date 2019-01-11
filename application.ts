const healthcheck = require("@hmcts/nodejs-healthcheck");
const { InfoContributor, infoRequestHandler } = require("@hmcts/info-provider");
import * as express from "express";
const apiRoute = require("./api");
import { config } from "./config";

const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const appInsights = require("applicationinsights");

const session = require("express-session");
const sessionFileStore = require("session-file-store");

const FileStore = sessionFileStore(session);

const appInsightsInstrumentationKey =
    process.env.APPINSIGHTS_INSTRUMENTATIONKEY || "AAAAAAAAAAAAAAAA";

app.use(
    session({
        cookie: {
            httpOnly: true,
            maxAge: 31536000,
            secure: config.secureCookie !== false
        },
        name: "jui-webapp",
        resave: true,
        saveUninitialized: true,
        secret: config.sessionSecret,
        store: new FileStore({
            path: process.env.NOW ? "/tmp/sessions" : ".sessions"
        })
    })
);

// local logging improves on appInsights
if (config.configEnv !== "local") {
    appInsights
        .setup(appInsightsInstrumentationKey)
        .setAutoDependencyCorrelation(true)
        .setAutoCollectRequests(true)
        .setAutoCollectPerformance(true)
        .setAutoCollectExceptions(true)
        .setAutoCollectDependencies(true)
        .setAutoCollectConsole(true)
        .setUseDiskRetryCaching(true)
        .start();

    const client = appInsights.defaultClient;
    client.trackTrace({ message: "Test Message App Insight Activated" });

    app.use((req, res, next) => {
        client.trackNodeHttpRequest({ request: req, response: res });
        next();
    });
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

function healthcheckConfig(msUrl) {
    return healthcheck.web(`${msUrl}/health`, {
        timeout: 6000,
        deadline: 6000
    });
}

app.get(
    "/health",
    healthcheck.configure({
        checks: {
            ccd_data_api: healthcheckConfig(config.services.ccd_data_api),
            ccd_def_api: healthcheckConfig(config.services.ccd_def_api),
            // idam_web: healthcheckConfig(config.services.idam_web),
            idam_api: healthcheckConfig(config.services.idam_api),
            s2s: healthcheckConfig(config.services.s2s),
            draft_store_api: healthcheckConfig(config.services.draft_store_api),
            dm_store_api: healthcheckConfig(config.services.dm_store_api),
            em_anno_api: healthcheckConfig(config.services.em_anno_api),
            em_npa_api: healthcheckConfig(config.services.em_npa_api),
            coh_cor_api: healthcheckConfig(config.services.coh_cor_api)
        },
        buildInfo: {}
    })
);

function infocheckConfig(msUrl) {
    return new InfoContributor(`${msUrl}/info`);
}

app.get(
    "/info",
    infoRequestHandler({
        info: {
            ccd_data_api: infocheckConfig(config.services.dm_store_api),
            ccd_def_api: infocheckConfig(config.services.ccd_def_api),
            idam_web: infocheckConfig(config.services.idam_web),
            idam_api: infocheckConfig(config.services.idam_api),
            s2s: infocheckConfig(config.services.s2s),
            draft_store_api: infocheckConfig(config.services.draft_store_api),
            dm_store_api: infocheckConfig(config.services.dm_store_api),
            em_anno_api: infocheckConfig(config.services.em_anno_api),
            em_npa_api: infocheckConfig(config.services.em_npa_api),
            coh_cor_api: infocheckConfig(config.services.coh_cor_api)
        },
        extraBuildInfo: {
            empty: {}
            // featureToggles: config.get('featureToggles'),
            // hostname: hostname()
        }
    })
);

app.get("/oauth2/callback", apiRoute);
app.get("/logout", apiRoute);
app.use("/api", apiRoute);

module.exports = app;
