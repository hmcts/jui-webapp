module.exports = {
    services: {
        ccd_data_api: 'https://ccd-data-store-api-demo.service.core-compute-demo.internal',
        // idam_web: 'https://idam-web-public.aat.platform.hmcts.net',
        // idam_api: 'https://idam-api.aat.platform.hmcts.net',
        idam_api: 'https://preprod-idamapi.reform.hmcts.net:3511',
        idam_web: 'http://idam.preprod.ccidam.reform.hmcts.net',
        s2s: 'http://rpe-service-auth-provider-demo.service.core-compute-demo.internal',
        dm_store_api: 'http://dm-store-demo.service.core-compute-demo.internal',
        em_anno_api: 'http://em-anno-demo.service.core-compute-demo.internal',
        em_redact_api: 'http://em-redact-demo.service.core-compute-demo.internal',
        coh_cor_api: 'http://coh-cor-demo.service.core-compute-demo.internal'
    },
    useProxy: false
};
