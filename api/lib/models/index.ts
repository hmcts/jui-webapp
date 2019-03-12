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
    debug: (...message: any[]) => void
    error: (...message: any[]) => void
    info: (...message: any[]) => void
    trackRequest: any,
    warn: (...message: any[]) => void
}

export function isJUILogger(object: any): object is JUILogger {
    return '_logger' in object &&
        'debug' in object &&
        'error' in object &&
        'info' in object &&
        'warn' in object &&
        'trackRequest' in object
}
