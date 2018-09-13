module.exports = {
    services: {
        ccd_data_api: 'http://localhost:3004',
        // idam_web: 'https://idam-web-public.aat.platform.hmcts.net',
        // idam_api: 'https://idam-api.aat.platform.hmcts.net',
        idam_api: 'https://preprod-idamapi.reform.hmcts.net:3511',
        idam_web: 'http://idam.preprod.ccidam.reform.hmcts.net',
        s2s: 'http://rpe-service-auth-provider-aat.service.core-compute-aat.internal',
        dm_store_api: 'http://dm-store-aat.service.core-compute-aat.internal',
        em_anno_api: 'http://em-anno-aat.service.core-compute-aat.internal',
        em_redact_api: 'http://em-redact-aat.service.core-compute-aat.internal',
        coh_cor_api: 'http://coh-cor-aat.service.core-compute-aat.internal'
    },
    useProxy: true,
    protocol: 'http'
};
