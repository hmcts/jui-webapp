export class MockConfigService {
    config = {
        config: {
            cookies: {
                token: 'bob',
                userId: 'ben'
            },
            services: {
                idam_web: 'http://idam_url.com'
            },
            oauth_callback_url: 'callback_url',
            api_base_url: 'api_base',
            idam_client: 'client_name'
        }
    };
}
export class MockTransferStateService {
    authenticated = false;

    isAuthenticated() {
        return this.authenticated;
    }

    set(key, data) {
        return true;
    }
    get(key, item){
        return true;
    }
}
export const configMock = {
    config: {
        api_base_url: ''
    }
};
