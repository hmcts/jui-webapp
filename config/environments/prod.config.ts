export default {
    services: {
        ccd_data_api:
            'http://ccd-data-store-api-prod.service.core-compute-prod.internal',
        ccd_def_api:
            'http://ccd-definition-store-api-prod.service.core-compute-prod.internal',
        idam_web:
            'https://hmcts-access.service.gov.uk',
        idam_api:
          'https://idam-api.platform.hmcts.net',
        s2s:
            'http://rpe-service-auth-provider-prod.service.core-compute-prod.internal',
        draft_store_api:
            'http://draft-store-service-prod.service.core-compute-prod.internal',
        dm_store_api:
            'http://dm-store-prod.service.core-compute-prod.internal',
        em_anno_api: 'http://em-anno-prod.service.core-compute-prod.internal',
        em_npa_api: 'http://em-npa-prod.service.core-compute-prod.internal',
        coh_cor_api: 'http://coh-cor-prod.service.core-compute-prod.internal'
    },
    useProxy: false,
    secureCookie: false,
    sessionSecret: 'secretSauce',
    logging: 'debug'
};
