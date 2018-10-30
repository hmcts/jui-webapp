import { CaseStatusGoto } from './case.status.goto';

fdescribe('CaseStatusGoto', () => {
    let caseStatusGoToPipe: CaseStatusGoto;
    let status = {};
    const jur = 'SSCS', caseType = 'Benefit', caseId = '3qweeq';
    beforeEach(() => {
        caseStatusGoToPipe = new CaseStatusGoto();
    });

    it('should produce go to href without ID', () => {
        status = {
            name: 'awfRe',
            actionGoTo: 'questions',
        };

        const result = caseStatusGoToPipe.transform(status, jur, caseType, caseId);
        expect(result).toBe('/case/SSCS/Benefit/3qweeq/questions');
    });

    it('should produce go to href with ID', () => {
        status = {
            name: 'awfRe',
            actionGoTo: 'questions',
            ID: 'UUID'
        };

        const result = caseStatusGoToPipe.transform(status, jur, caseType, caseId);
        expect(result).toBe('/case/SSCS/Benefit/3qweeq/questions/UUID');
    });
});
