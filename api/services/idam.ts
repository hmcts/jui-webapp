import * as express from 'express'
import { config } from '../../config'
import { http } from '../lib/http'
import { getHealth, getInfo } from '../lib/util'
import * as log4jui from '../lib/log4jui'


const configTest = require('@hmcts/properties-volume').addTo(require('config'),{mountPoint:'some/properties/mount/point'})



const url = config.services.idam_apiq
const sSecrets = process.env.secrets;
const logger = log4jui.getLogger('auth')
logger.info(config);
logger.info("config = " + JSON.stringify(config));
logger.info("sSecrets = " + sSecrets)
//const idamSecret = sSecrets.rpa.jui-oauth2-token || 'AAAAAAAAAAAAAAAA'
const idamSecret = 'AAAAAAAAAAAAAAAA'
const idamClient = config.idam_client
const idamProtocol = config.protocol
const oauthCallbackUrl = config.oauth_callback_url

export async function getDetails(options = {}) {
    // have to pass options in at first login as headers are yet to be attached.
    const response = await http.get(`${url}/details`, options)

    return response.data
}

// this does same as above + more. need to depricate above
export async function getUser(email = null) {
    const response = email ? await http.get(`${url}/users?email=${email}`) : await http.get(`${url}/details`)

    return response.data
}

export async function postOauthToken(code, host) {
    const redirectUri = `${idamProtocol}://${host}/${oauthCallbackUrl}`
    const urlX = `${url}/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}`

    const options = {
        headers: {
            Authorization: `Basic ${Buffer.from(`${idamClient}:${idamSecret}`).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }

    const response = await http.post(urlX, {}, options)

    return response.data
}

export default app => {
    const router = express.Router({ mergeParams: true })
    app.use('/idam', router)

    router.get('/health', (req, res, next) => {
        res.status(200).send(getHealth(url))
    })

    router.get('/info', (req, res, next) => {
        res.status(200).send(getInfo(url))
    })

    router.get('/details', (req, res, next) => {
        res.status(200).send(getDetails())
    })
}

