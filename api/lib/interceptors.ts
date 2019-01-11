import * as exceptionFormatter from 'exception-formatter'
import * as log4js from 'log4js'
import { config } from '../../config'
import { shorten, valueOrNull } from '../lib/util'

const exceptionOptions = {
    maxLines: 1,
}

export function requestInterceptor(request) {
    const logger = log4js.getLogger('outgoing')
    logger.level = config.logging

    const url = shorten(request.url, config.maxLogLine)
    logger.info(`${request.method.toUpperCase()} to ${url}`)

    return request
}

export function successInterceptor(response) {
    const logger = log4js.getLogger('return')
    logger.level = config.logging

    const url = shorten(response.config.url, config.maxLogLine)

    logger.info(`Success on ${response.config.method.toUpperCase()} to ${url}`)
    return response
}

export function errorInterceptor(error) {
    const logger = log4js.getLogger('return')
    logger.level = config.logging

    const url = shorten(error.config.url, config.maxLogLine)

    const status = valueOrNull(error, 'response.status') ? error.response.status : Error(error).message
    const data = valueOrNull(error, 'response.status') ? JSON.stringify(error.response.data, null, 2) : null

    logger.error(`Error on ${error.config.method.toUpperCase()} to ${url} (${error}) \n 
    ${exceptionFormatter(data, exceptionOptions)}`)

    return Promise.reject(error.response)
}
