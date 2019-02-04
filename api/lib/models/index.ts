export interface CCDEventResponse {
    token: string
    caseDetails: any
}

export interface CCDCaseWithSchema {
    caseData: any
    schema: any
}

export interface JUILogger {
    debug: (message: string) => void
    error: (message: string) => void
    info: (message: string) => void
    warn: (message: string) => void
}
