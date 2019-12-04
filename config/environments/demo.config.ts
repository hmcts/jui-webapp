export default {
    services: {
        ccd_data_api:
            'http://ccd-data-store-api-demo.service.core-compute-demo.internal',
        ccd_def_api:
            'http://ccd-definition-store-api-demo.service.core-compute-demo.internal',
        idam_web: 'https://idam-web-public.demo.platform.hmcts.net',
        idam_api: 'https://idam-api.demo.platform.hmcts.net',
        s2s:
            'http://rpe-service-auth-provider-demo.service.core-compute-demo.internal',
        draft_store_api:
            'http://draft-store-service-demo.service.core-compute-demo.internal',
        dm_store_api:
            'http://dm-store-demo.service.core-compute-demo.internal',
        em_anno_api: 'http://em-anno-demo.service.core-compute-demo.internal',
        em_npa_api: 'http://em-npa-demo.service.core-compute-demo.internal',
        coh_cor_api: 'http://coh-cor-demo.service.core-compute-demo.internal'
    },
    useProxy: false,
    secureCookie: false,
    sessionSecret: 'secretSauce',
    logging: 'debug'
};
