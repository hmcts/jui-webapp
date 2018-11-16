const caseStatusProcessor = require('./case-status-processor')

describe('Case Status Processor', () => {
    const state = {
        stateName: 'continuous_online_hearing_started',
        actionGoTo: 'url'
    }

    it('should return case status to view', () => {
        const result = caseStatusProcessor(state, {
            jurisdiction: 'SSCS',
            case_type_id: 'BENEFIT'
        })
        expect(result.name).toEqual('DWP response')
        expect(result.actionGoTo).toEqual('url')
    })

    it('it should return same status back for unrecognised Jurisdiction', () => {
        const result = caseStatusProcessor(state, {
            jurisdiction: 'SSCS_1',
            case_type_id: 'BENEFIT'
        })
        expect(result.name).toEqual('continuous_online_hearing_started')
        expect(result.actionGoTo).toEqual('url')
    })

    it('it should return same status back for unrecognised case type', () => {
        const result = caseStatusProcessor(state, {
            jurisdiction: 'SSCS',
            case_type_id: 'BENEFIT_BLAH'
        })
        expect(result.name).toEqual('continuous_online_hearing_started')
        expect(result.actionGoTo).toEqual('url')
    })

    it('it should return same status back for undefined case status mapping', () => {
        const result = caseStatusProcessor({
            stateName: 'continuous_online_hearing_started_1',
            actionGoTo: ''
        }, {
            jurisdiction: 'SSCS',
            case_type_id: 'BENEFIT'
        })
        expect(result.name).toEqual('continuous_online_hearing_started_1')
        expect(result.actionGoTo).toEqual('')
    })
})
