import {CaseStatus, CaseStatusGoto} from './case.status.goto';

describe('CaseStatusGoto', () => {
    let pipe: CaseStatusGoto;
    let status: CaseStatus;
    const jurisdiction = 'SSCS',
          caseType = 'Benefit',
          caseId = '3qweeq';
    beforeEach(() => {
        pipe = new CaseStatusGoto();
    });

    it('providing not all 4 values', () => {
        status = {
            name: 'awfRe',
            actionGoTo: 'questions',
        };
        //status, jurisdictionisdiction, caseType, caseId
        expect(pipe.transform(status, '' , '', '')).toBe(undefined);
        expect(pipe.transform(status, '' , '', '')).toBe(undefined);
        expect(pipe.transform(status, 'jurisdiction' , '', '')).toBe(undefined);
        expect(pipe.transform(status, 'jurisdiction' , 'caseType', '')).toBe(undefined);
        expect(pipe.transform(status, 'jurisdiction' , 'caseType', 'caseId')).toBe( '/case/jurisdiction/caseType/caseId/questions');
    });
    it('providing all 4 values', () => {
        status = {
            name: 'awfRe',
            actionGoTo: 'questions',
        };
        expect(pipe.transform(status, 'jurisdiction' , 'caseType', 'caseId')).toBe( '/case/jurisdiction/caseType/caseId/questions');
    });

    it('providing no values and No fallback', () => {
        status = {
            name: 'awfRe',
            actionGoTo: 'questions',
        };

        //status, jurisdictionisdiction, caseType, caseId
        expect(pipe.transform(status, '' , '', '')).toBe(undefined);
    });
    //
    it('should produce go to href without ID', () => {
        status = {
            name: 'awfRe',
            actionGoTo: 'questions',
        };
        const result = pipe.transform(status, jurisdiction, caseType, caseId);
        expect(result).toBe(`/case/${jurisdiction}/${caseType}/${caseId}/${status.actionGoTo}`);
    });
    it('should produce go to href with ID', () => {
        status = {
            name: 'awfRe',
            actionGoTo: 'questions',
            ID: 'UUID'
        };
        const result = pipe.transform(status, jurisdiction, caseType, caseId);
        expect(result).toBe(`/case/${jurisdiction}/${caseType}/${caseId}/${status.actionGoTo}/${status.ID}`);
    });
});
