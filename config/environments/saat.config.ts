export default {
    services: {
        ccd_data_api:
            'http://ccd-data-store-api-saat.service.core-compute-saat.internal',
        ccd_def_api:
            'http://ccd-definition-store-api-saat.service.core-compute-saat.internal',
        idam_web: 'http://idam-web-public-idam-saat.service.core-compute-idam-saat.internal',
        idam_api: 'http://idam-api-idam-saat.service.core-compute-idam-saat.internal',
        s2s:
            'http://rpe-service-auth-provider-saat.service.core-compute-saat.internal',
        draft_store_api:
            'http://draft-store-service-saat.service.core-compute-saat.internal',
        dm_store_api:
            'http://dm-store-saat.service.core-compute-saat.internal',
        em_anno_api: 'http://em-anno-saat.service.core-compute-saat.internal',
        em_npa_api: 'http://em-npa-saat.service.core-compute-saat.internal',
        coh_cor_api: 'http://coh-cor-saat.service.core-compute-saat.internal'
    },
    useProxy: false,
    secureCookie: false,
    sessionSecret: 'secretSauce'
};
