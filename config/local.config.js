module.exports = {
    services: {
        ccd_data_api: process.env.CCD_DATA_URI || "https://ccd-data-store-api-aat.service.core-compute-aat.internal",
        idamLogin: process.env.IDAM_LOGIN_URL || "http://idam-web-public-idam-aat.service.core-compute-aat.internal",
        idam: process.env.IDAM_API_URI || "http://idam-api-idam-aat.service.core-compute-aat.internal",
        s2s: process.env.S2S_URI || "http://rpe-service-auth-provider-aat.service.core-compute-aat.internal",
        dm_store_api: process.env.DM_STORE_URI || "http://dm-store-aat.service.core-compute-aat.internal",
        em_anno_api: process.env.EM_ANNO_URI || "http://em-anno-aat.service.core-compute-aat.internal",
        em_redact_api: process.env.EM_REDACT_URI || "http://em-redact-aat.service.core-compute-aat.internal"
    },
    microservice: "jui_webapp",
    useProxy: true
};
