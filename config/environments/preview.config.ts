export default {
    services: {
        ccd_data_api:
            'https://ccd-data-store-api-aat.service.core-compute-aat.internal',
        ccd_def_api:
            'https://ccd-definition-store-api-aat.service.core-compute-aat.internal',
        idam_web: 'https://idam-web-public-idam-aat.service.core-compute-idam-aat.internal',
        idam_api: 'https://idam-api-idam-aat.service.core-compute-idam-aat.internal',
        s2s:
            'https://rpe-service-auth-provider-aat.service.core-compute-aat.internal',
        draft_store_api:
            'https://draft-store-service-aat.service.core-compute-aat.internal',
        dm_store_api: 'https://dm-store-aat.service.core-compute-aat.internal',
        em_anno_api: 'https://em-anno-aat.service.core-compute-aat.internal',
        em_npa_api: 'https://em-npa-aat.service.core-compute-aat.internal',
        coh_cor_api: 'https://coh-cor-aat.service.core-compute-aat.internal'
    },
    useProxy: false,
    secureCookie: false,
    sessionSecret: 'secretSauce',
    logging: 'debug'
};
