module.exports = {
    services: {
        ccd_data_api: "https://ccd-data-store-api-sprod.service.core-compute-sprod.internal",
        // idam_web: "https://idam-web-public-idam-saat.service.core-compute-saat.internal",
        // idam_api: "https://idam-api-idam-saat.service.core-compute-saat.internal",
        idam_web: "https://idam-test.dev.ccidam.reform.hmcts.net",
        idam_api: "http://betaDevBccidamAppLB.reform.hmcts.net",
        s2s: "http://rpe-service-auth-provider-sprod.service.core-compute-sprod.internal",
        dm_store_api: "http://dm-store-sprod.service.core-compute-sprod.internal",
        em_anno_api: "http://em-anno-sprod.service.core-compute-sprod.internal",
        em_redact_api: "http://em-redact-sprod.service.core-compute-sprod.internal",
        coh_cor_api: "http://coh-cor-sprod.service.core-compute-sprod.internal"
    },
    api_base_url: "https://jui-webapp-sprod.service.core-compute-sprod.internal",
    oauth_callback_url: "https://jui-webapp-sprod.service.core-compute-sprod.internal/oauth2/callback",
    useProxy: false
};
