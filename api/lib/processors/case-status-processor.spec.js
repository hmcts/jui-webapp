const caseStatusProcessor = require('./case-status-processor');


describe('Case Status Processor', () => {

    it('should return case status to view', () => {
        const result = caseStatusProcessor('continuous_online_hearing_started', {
            jurisdiction: 'SSCS',
            case_type_id: 'BENEFIT'
        });
        expect(result).toEqual('DWP response received');
    });

    it('it should return same status back for unrecognised Jurisdiction', () => {
        const result = caseStatusProcessor('continuous_online_hearing_started', {
            jurisdiction: 'SSCS_1',
            case_type_id: 'BENEFIT'
        });
        expect(result).toEqual('continuous_online_hearing_started');
    });

    it('it should return same status back for unrecognised case type', () => {
        const result = caseStatusProcessor('continuous_online_hearing_started', {
            jurisdiction: 'SSCS',
            case_type_id: 'BENEFIT_BLAH'
        });
        expect(result).toEqual('continuous_online_hearing_started');
    });

    it('it should return same status back for undefined case status mapping', () => {
        const result = caseStatusProcessor('continuous_online_hearing_started_1', {
            jurisdiction: 'SSCS',
            case_type_id: 'BENEFIT'
        });
        expect(result).toEqual('continuous_online_hearing_started_1');
    });
});
