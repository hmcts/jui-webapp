export default {
    services: {
        ccd_data_api: 'http://localhost:3004',
        ccd_def_api:
            'http://ccd-definition-store-api-aat.service.core-compute-aat.internal',
        idam_web: 'https://idam.preprod.ccidam.reform.hmcts.net',
        idam_api: 'https://preprod-idamapi.reform.hmcts.net:3511',
        s2s:
            'http://rpe-service-auth-provider-aat.service.core-compute-aat.internal',
        draft_store_api:
            'http://draft-store-service-aat.service.core-compute-aat.internal',
        dm_store_api: 'http://dm-store-aat.service.core-compute-aat.internal',
        em_anno_api: 'http://em-anno-aat.service.core-compute-aat.internal',
        em_npa_api: 'http://em-npa-aat.service.core-compute-aat.internal',
        coh_cor_api: 'http://coh-cor-aat.service.core-compute-aat.internal'
    },
    useProxy: true,
    protocol: 'http',
    secureCookie: false,
    sessionSecret: 'secretSauce'
};
