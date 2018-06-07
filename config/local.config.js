module.exports = {
    services: {
        ccd_data_api: "https://ccd-data-store-api-saat.service.core-compute-saat.internal",
        s2s: "http://rpe-service-auth-provider-saat.service.core-compute-saat.internal",
        dm: "",
        idam_web: "https://idam-web-public-idam-saat.service.core-compute-saat.internal",
        idam_api: "https://idam-api-idam-saat.service.core-compute-saat.internal"
    },
    microservice: "ccd_gw",
    useProxy: true,
    cookieName: '_JUI_AUTH_',
    idam_client: 'jui_webapp'
};