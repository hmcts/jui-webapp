import * as express from 'express'
import { config } from '../../config'
import { http } from '../lib/http'

const url = config.services.idam_api
const idamSecret = process.env.IDAM_SECRET || 'AAAAAAAAAAAAAAAA'
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

export async function getHealth() {
    const response = await http.get(`${url}/health`)

    return response.data
}

export async function getInfo() {
    const response = await http.get(`${url}/info`)
}

export default app => {
    const router = express.Router({ mergeParams: true })
    app.use('/idam', router)

    router.get('/health', (req, res, next) => {
        res.status(200).send(getHealth())
    })

    router.get('/info', (req, res, next) => {
        res.status(200).send(getInfo())
    })

    router.get('/details', (req, res, next) => {
        res.status(200).send(getDetails())
    })
}

