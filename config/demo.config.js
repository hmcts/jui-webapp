module.exports = {
    services: {
        ccd_data_api: "https://ccd-data-store-api-demo.service.core-compute-demo.internal",
        idam_web: "http://idam-web-public-idam-demo.service.core-compute-demo.internal",
        idam_api: "http://idam-api-idam-demo.service.core-compute-demo.internal",
        s2s: "http://rpe-service-auth-provider-demo.service.core-compute-demo.internal",
        dm_store_api: "http://dm-store-demo.service.core-compute-demo.internal",
        em_anno_api: "http://em-anno-demo.service.core-compute-demo.internal",
        em_redact_api: "http://em-redact-demo.service.core-compute-demo.internal"
    },
    api_base_url: "https://jui-webapp-demo.service.core-compute-demo.internal",
    oauth_callback_url: "https://jui-webapp-demo.service.core-compute-demo.internal/oauth2/callback",
    microservice: "ccd_gw",
    useProxy: false,
    cookieName: '_JUI_AUTH_',
    idam_client: 'jui_webapp'
};
