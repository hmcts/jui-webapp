import * as log4js from "log4js"

export interface CCDEventResponse {
    token: string
    caseDetails: any
}

export interface CCDCaseWithSchema {
    caseData: any
    schema: any
}

export interface JUILogger {
    _logger: log4js.Logger
    debug: (message: string) => void
    error: (message: string) => void
    info: (message: string) => void
    trackRequest: any,
    warn: (message: string) => void
}

export function isJUILogger(object: any): object is JUILogger {
    return '_logger' in object &&
        'debug' in object &&
        'error' in object &&
        'info' in object &&
        'warn' in object &&
        'trackRequest' in object
}