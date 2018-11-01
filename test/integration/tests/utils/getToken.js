const config = require('../../../../config')
const host = 'https://localhost:3000'
const base64 = require('base-64')

const idamSecret = process.env.IDAM_SECRET || 'AAAAAAAAAAAAAAAA'
const idamClient = config.idam_client
const idamProtocol = config.protocol
const oauthCallbackUrl = config.oauth_callback_url
const utilJson = require('./fetchJson')
const fetch = require('node-fetch')

async function getOauth2Token () {
    const redirectUri = 'http://localhost:3000/oauth2/callback'
    var token

    var hcode = await generateClientCode()


    var data
    const url = 'http://localhost:4501/oauth2/token?code=' + hcode + '&client_id=' + idamClient + '&redirect_uri=' + redirectUri + '&client_secret=' + idamSecret + '&grant_type=authorization_code'

    const otherParam = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
        method: 'POST'
    }

    await fetch(url, otherParam).then(data => data.json())
        .then(res => {
            token = res.access_token
            console.log(res.access_token)
            return res.code
        })
        .catch(error => {
            console.log(error)
        })
    return token;

}

async function generateClientCode () {
    const redirectUri = 'http://localhost:3000/oauth2/callback'
    const url = 'http://localhost:4501/oauth2/authorize?response_type=code&client_id=' + idamClient + '&redirect_uri=' + redirectUri
    const data = ''
    var encode = base64.encode(('juitestuser2@gmail.com' + ':' + 'password'))
    var code
    const otherParam = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + encode
        },
        body: data,
        method: 'POST'
    }

    await fetch(url, otherParam).then(data => data.json())
        .then(res => {
            code = res.code
            console.log(res.code)
            return res.code
        })
        .catch(error => {
            console.log(error)
        })
    return code
}

module.exports.getOauth2Token = getOauth2Token()
