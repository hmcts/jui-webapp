module.exports = {
    services: {
        ccd_data_api: "https://ccd-data-store-api-sprod.service.core-compute-sprod.internal",
        idam_web: "https://idam-web-public-idam-sprod.service.core-compute-sprod.internal",
        idam_api: "https://idam-api-idam-sprod.service.core-compute-sprod.internal",
        s2s: "http://rpe-service-auth-provider-sprod.service.core-compute-sprod.internal",
        dm_store_api: "http://dm-store-sprod.service.core-compute-sprod.internal",
        em_anno_api: "http://em-anno-sprod.service.core-compute-sprod.internal",
        em_redact_api: "http://em-redact-sprod.service.core-compute-sprod.internal"
    },
    microservice: "jui_webapp",
    useProxy: true,
    cookieName: '_JUI_AUTH_',
    idam_client: 'jui_webapp'
};
