import * as express from 'express'
import * as otp from 'otp'
import { config } from '../../config'
import { http } from '../lib/http'

const url = config.services.s2s
const microservice = config.microservice
const s2sSecret = process.env.S2S_SECRET || 'AAAAAAAAAAAAAAAA'

export async function postS2SLease() {
    const oneTimePassword = otp({ secret: s2sSecret }).totp()

    const request = await http.post(`${url}/lease`, {
        microservice,
        oneTimePassword,
    })

    return request.data

}

export async function getHealth() {
    const response = await http.get(`${url}/health`)
    return response.data
}

export async function getInfo() {
    const response = await http.get(`${url}/info`)
    return response.data
}

export default app => {
    const router = express.Router({ mergeParams: true })
    app.use('/s2s', router)

    router.get('/health', (req, res, next) => {
        res.status(200).send(getHealth())
    })

    router.get('/info', (req, res, next) => {
        res.status(200).send(getInfo())
    })
}

