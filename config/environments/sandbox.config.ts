export default {
    services: {
        ccd_data_api:
            'http://ccd-data-store-api-sandbox.service.core-compute-sandbox.internal',
        ccd_def_api:
            'http://ccd-definition-store-api-sandbox.service.core-compute-sandbox.internal',
        idam_web: 'https://idam-test.dev.ccidam.reform.hmcts.net',
        idam_api: 'https://betaDevBccidamAppLB.reform.hmcts.net',
        s2s:
            'http://rpe-service-auth-provider-sandbox.service.core-compute-sandbox.internal',
        draft_store_api:
            'http://draft-store-service-sandbox.service.core-compute-sandbox.internal',
        dm_store_api:
            'http://dm-store-sandbox.service.core-compute-sandbox.internal',
        em_anno_api:
            'http://em-anno-sandbox.service.core-compute-sandbox.internal',
        em_npa_api: 'http://em-npa-sandbox.service.core-compute-sandbox.internal',
        coh_cor_api: 'http://coh-cor-sandbox.service.core-compute-sandbox.internal'
    },
    useProxy: false,
    secureCookie: false,
    sessionSecret: 'secretSauce'
};
