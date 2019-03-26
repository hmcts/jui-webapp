export default {
    services: {
        ccd_data_api:
            'https://ccd-data-store-api-sandbox.service.core-compute-sandbox.internal',
        ccd_def_api:
            'https://ccd-definition-store-api-sandbox.service.core-compute-sandbox.internal',
        idam_web: 'https://idam-test.dev.ccidam.reform.hmcts.net',
        idam_api: 'https://betaDevBccidamAppLB.reform.hmcts.net',
        s2s:
            'https://rpe-service-auth-provider-sandbox.service.core-compute-sandbox.internal',
        draft_store_api:
            'https://draft-store-service-sandbox.service.core-compute-sandbox.internal',
        dm_store_api:
            'https://dm-store-sandbox.service.core-compute-sandbox.internal',
        em_anno_api:
            'https://em-anno-sandbox.service.core-compute-sandbox.internal',
        em_npa_api: 'https://em-npa-sandbox.service.core-compute-sandbox.internal',
        coh_cor_api: 'https://coh-cor-sandbox.service.core-compute-sandbox.internal'
    },
    useProxy: false,
    secureCookie: false,
    sessionSecret: 'secretSauce'
};
