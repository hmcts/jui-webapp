export const application = {
    cookies: {
        token: '__auth__',
        userId: '__userid__',
        sessionId: '__sessionId__'
    },
    maxCCDRetries: 3,
    microservice: 'jui_webapp',
    idam_client: 'juiwebapp',
    juiJudgeRole: 'jui-judge',
    juiPanelMember: 'jui-panelmember',
    localEnv: 'local',
    oauth_callback_url: 'oauth2/callback',
    protocol: 'https',
    platformCookie: 'platform',
    log4jui: {
        appenders: {
            out: {
                layout: {
                    pattern: '%[%d | %p |%X{catFormatted}|%] %m%n',
                    type: 'pattern',
                },
                type: 'stdout',
            },
        },
        categories: {
            default: { appenders: ['out'], level: 'info' },
        },
    }
};
