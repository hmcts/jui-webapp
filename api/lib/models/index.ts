export interface CCDEventResponse {
    token: string
    caseDetails: any
}

export * from './documents'

export interface CCDCaseWithSchema {
    caseData: any
    schema: any
}
