module.exports = {
    services: {
        ccd_data_api: "https://ccd-data-store-api-prod.service.core-compute-prod.internal",
        idam_web: "http://idam-web-public-idam-prod.service.core-compute-prod.internal",
        idam_api: "http://idam-api-idam-prod.service.core-compute-prod.internal",
        s2s: "http://rpe-service-auth-provider-prod.service.core-compute-prod.internal",
        dm_store_api: "http://dm-store-prod.service.core-compute-prod.internal",
        em_anno_api: "http://em-anno-prod.service.core-compute-prod.internal",
        em_redact_api: "http://em-redact-prod.service.core-compute-prod.internal"
    },
    api_base_url: "https://jui-webapp-prod.service.core-compute-prod.internal",
    oauth_callback_url: "https://jui-webapp-prod.service.core-compute-prod.internal/oauth2/callback",
    useProxy: false
};
