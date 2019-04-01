export default {
    services: {
        ccd_data_api:
            'https://ccd-data-store-api-demo.service.core-compute-demo.internal',
        ccd_def_api:
            'https://ccd-definition-store-api-demo.service.core-compute-demo.internal',
        idam_web: 'https://idam-web-public.demo.platform.hmcts.net',
        idam_api: 'https://idam-api.demo.platform.hmcts.net',
        s2s:
            'https://rpe-service-auth-provider-demo.service.core-compute-demo.internal',
        draft_store_api:
            'https://draft-store-service-demo.service.core-compute-demo.internal',
        dm_store_api:
            'https://dm-store-demo.service.core-compute-demo.internal',
        em_anno_api: 'https://em-anno-demo.service.core-compute-demo.internal',
        em_npa_api: 'https://em-npa-demo.service.core-compute-demo.internal',
        coh_cor_api: 'https://coh-cor-demo.service.core-compute-demo.internal'
    },
    useProxy: false,
    secureCookie: false,
    sessionSecret: 'secretSauce',
    logging: 'debug'
};
