module.exports = {
    services: {
        ccd_data_api: "https://ccd-data-store-api-saat.service.core-compute-saat.internal",
        idam_web: "https://idam-web-public-idam-saat.service.core-compute-saat.internal",
        idam_api: "https://idam-api-idam-saat.service.core-compute-saat.internal",
        s2s: "http://rpe-service-auth-provider-saat.service.core-compute-saat.internal",
        dm_store_api: "http://dm-store-saat.service.core-compute-saat.internal",
        em_anno_api: "http://em-anno-saat.service.core-compute-saat.internal",
        em_redact_api: "http://em-redact-saat.service.core-compute-saat.internal"
    },
    api_base_url: "http://localhost:3000",
    oauth_callback_url: "http://localhost:3000/oauth2/callback",
    microservice: "ccd_gw",
    useProxy: true,
    cookieName: '_JUI_AUTH_',
    idam_client: 'jui_webapp'
};
