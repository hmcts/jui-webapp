import { request, response } from 'express'
import { generate } from 'shortid'
import { config } from '../../../config'

const sessionId = config.cookies.sessionId

let res = null
let req = null

export default function setReqRes(expressRes: response, expressReq: request, next) {
    res = expressRes
    req = expressReq

    // set response object to get session in logging
    if (res.cookie) {
        req.cookie(sessionId, generate())
    }
    next()

}

export function response(): response {
    return res
}

export function request(): request {
    return req
}

export function isReqResSet(): boolean {
    return res && req
}