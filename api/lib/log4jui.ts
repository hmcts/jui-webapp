import * as log4js from 'log4js'
import { config } from '../../config'
import * as errorStack from '../lib/errorStack'
import { JUILogger } from '../lib/models'
import { client } from './appInsights'
import { isReqResSet, request, response } from './middleware/responseRequest'

const sessionid = config.cookies.sessionId

// This is done to mimic log4js calls

export function getLogger(category: string): JUILogger {
    const logger: log4js.Logger = log4js.getLogger(category)
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

export function prepareMessage(fullMessage: string): string {
    let uid
    let sessionId

    if (isReqResSet()) {
        const req = request()
        const res = response()

        uid = req.session && req.session.user ? req.session.user.id : null
        sessionId = req.cookies ? req.cookies[sessionid] : null
    }

    const userString: string = uid && sessionId ? `[${uid} - ${sessionId}] - ` : ''
    return `${userString}${fullMessage}`
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

