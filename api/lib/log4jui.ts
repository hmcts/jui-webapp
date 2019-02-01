import * as log4js from 'log4js'
import { config } from '../../config'
import { client } from './appInsights'

let logger = null

// This is done to mimic log4js calls

export function getLogger(category: string) {
    logger = log4js.getLogger(category)
    logger.level = config.logging || 'off'

    return {
        debug,
        error,
        info,
        warn,
    }
}

function info(...messages: any[]) {
    let fullMessage = ''

    for (const message of messages) {
        fullMessage += message
    }

    client.trackTrace({message: `INFO ${fullMessage}`});
    logger.info(fullMessage)
}

function warn(...messages: any[]) {
    let fullMessage = ''

    for (const message of messages) {
        fullMessage += message
    }
    logger.warn(fullMessage)
}

function debug(...messages: any[]) {
    let fullMessage = ''

    for (const message of messages) {
        fullMessage += message
    }
    logger.debug(fullMessage)
}

function error(...messages: any[]) {
    let fullMessage = ''

    for (const message of messages) {
        fullMessage += message
    }

    client.trackException({exception: new Error(fullMessage)})
    logger.error(fullMessage)
}
