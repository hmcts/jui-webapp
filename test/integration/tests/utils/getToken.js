const config = require('../../../../config');
const secret = process.env.IDAM_SECRET || 'AAAAAAAAAAAAAAAA';
const code = '' ;
const host = 'https://localhost:3000'
const base64 = require('base-64');
const idamSecret = process.env.IDAM_SECRET || 'AAAAAAAAAAAAAAAA';
const idamClient = config.idam_client;
const idamProtocol = config.protocol;
const oauthCallbackUrl = config.oauth_callback_url;
const utilJson = require('./fetchJson');

function getOauth2Token (code)  {
    const redirectUri = `${idamProtocol}://${host}/${oauthCallbackUrl}`;
    code =  generateClientCode();
    // logger.info('calling oauth2 token');

    const headers = {
        'Content-Type' : 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${idamClient}:${idamSecret}`).toString('base64')}`
};

    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', redirectUri);


    return utilJson.fetchJson(`${idam_api_url}/oauth2/token`, {

        method: 'POST',
        timeout: 10000,
        body: params.toString(),
        headers: headers
});
};

async function generateClientCode() {
    const encoded = base64.encode(('juitestuser2@gmail.com' + ':' + 'Monday01'));
    console.log(encoded)
    const request = require('request');
    const redirectUri = `${idamProtocol}://${host}/${oauthCallbackUrl}`;

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + encoded
    }

    const body='/oauth2/authorize?response_type=code&client_id=juiwebapp&redirect_uri=http://localhost:3000/oauth2/callback' ;
    await console.log( utilJson.fetchJson('http://localhost:4501', {
        method: 'POST',
        timeout: 10000,
        body: body,
        headers: headers
    }));

    return '';


    // code = request.get('http://localhost:4501')
    //     .header('Authorization', 'Basic' + encoded)
    //     .post('/oauth2/authorize?response_type=code&client_id=juiwebapp &redirect_uri=' + redirectUri)
    //     .body().path('code');
    // console.log(code);
   // return '';
}


//module.exports.getOauth2Token = getOauth2Token();
module.exports.generateClientCode = generateClientCode();
