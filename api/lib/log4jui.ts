import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { request, response } from 'express'
import * as log4js from 'log4js'
import { config } from '../../config'
import * as errorStack from '../lib/errorStack'
import { valueOrNull } from '../lib/util'
import { client } from './appInsights'

let logger = null
let req = null
let res = null

const cookieUserId = config.cookies.userId
const sessionid = config.cookies.sessionId

// This is done to mimic log4js calls

export function getLogger(category: string) {
    logger = log4js.getLogger(category)
    logger.level = config.logging || 'off'

    return {
        _logger: logger,
        debug,
        error,
        info,
        trackRequest,
        warn,
    }
}

function prepareMessage(fullMessage: string): string {

    const uid = req && req.session ? req.session.user.id : null
    const sessionId = req && req.cookies ? req.cookies[sessionid] : null
    const userString: string = uid && sessionId ? `[${uid} - ${sessionId}] - ` : ''

    return `${userString}${fullMessage}`
}

export function setReqRes(request: request, response: response): void {
    req = request
    res = response
}

export function isReqResSet(): boolean {
    return res && req
}

function info(...messages: any[]) {
    const fullMessage = messages.join(' ')

    const category = this._logger.category
    if (client) {
        client.trackTrace({ message: `[INFO] ${category} - ${prepareMessage(fullMessage)}` })
    }
    this._logger.info(prepareMessage(fullMessage))
}

function warn(...messages: any[]) {
    const fullMessage = messages.join(' ')

    this._logger.warn(prepareMessage(fullMessage))
}

function debug(...messages: any[]) {
    const fullMessage = messages.join(' ')

    this._logger.debug(prepareMessage(fullMessage))
}

function trackRequest(obj: any) {
    if (client) {
        client.trackRequest(obj)
    }
}

function error(...messages: any[]) {
    const fullMessage = messages.join(' ')

    const category = this._logger.category
    if (client) {
        client.trackException({ exception: new Error(`[ERROR] ${category} - ${prepareMessage(fullMessage)}`) })
    }
    this._logger.error(prepareMessage(fullMessage))

    if (config.logging === 'debug' || config.logging === 'error') {
        errorStack.push([category, fullMessage])
    }
}

