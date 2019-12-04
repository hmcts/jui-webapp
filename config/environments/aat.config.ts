export default {
    services: {
        ccd_data_api:
            'http://ccd-data-store-api-aat.service.core-compute-aat.internal',
        ccd_def_api:
            'http://ccd-definition-store-api-aat.service.core-compute-aat.internal',
        idam_web: 'https://idam-web-public.aat.platform.hmcts.net',
        idam_api: 'https://idam-api.aat.platform.hmcts.net',
        s2s:
            'http://rpe-service-auth-provider-aat.service.core-compute-aat.internal',
        draft_store_api:
            'http://draft-store-service-aat.service.core-compute-aat.internal',
        dm_store_api: 'http://dm-store-aat.service.core-compute-aat.internal',
        em_anno_api: 'http://em-anno-aat.service.core-compute-aat.internal',
        em_npa_api: 'http://em-npa-aat.service.core-compute-aat.internal',
        coh_cor_api: 'http://coh-cor-aat.service.core-compute-aat.internal'
    },
    useProxy: false,
    secureCookie: false,
    sessionSecret: 'secretSauce',
    logging: 'debug'
};
