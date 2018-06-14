module.exports = {
    services: {
        ccd_data_api: "http://localhost:4452",
        idam_web: "https://localhost:3501/login",
        idam_api: "http://localhost:4501",
        s2s: "http://localhost:4502",
        dm_store_api: "http://localhost:4603",
        em_anno_api: "http://localhost:3621",
        em_redact_api: "http://localhost:3623"
    },
    api_base_url: "http://localhost:3000",
    oauth_callback_url: "http://localhost:3000/oauth2/callback",
    useProxy: false
};
