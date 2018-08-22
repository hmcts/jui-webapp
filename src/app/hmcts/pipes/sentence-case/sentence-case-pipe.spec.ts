import { SentenceCasePipe } from './sentence-case-pipe';


describe('SentenceCasePipe', () => {
    let sentenceCasePipe: SentenceCasePipe;

    beforeEach(() => {
        sentenceCasePipe = new SentenceCasePipe();
    });

    it('should produce no result if empty string', () => {
        expect(sentenceCasePipe.transform('')).toBe('');
    });

    it('should produce null if null string', () => {
        expect(sentenceCasePipe.transform(null)).toBe(null);
    });

    it('should transform valid string', () => {
        expect(sentenceCasePipe.transform('Form Submitted')).toBe('Form submitted');
    });

    it('should transform few words string', () => {
        expect(sentenceCasePipe.transform('Draft Consent order submitted')).toBe('Draft consent order submitted');
    });

    it('should transform first char toUpperCase', () => {
        expect(sentenceCasePipe.transform('form Submitted')).toBe('Form submitted');
    });

    it('should keep single UpperCase char within string as-is', () => {
        expect(sentenceCasePipe.transform('Form A Submitted')).toBe('Form A submitted');
    });

    it('should keep string-with-numbers as-is within string', () => {
        expect(sentenceCasePipe.transform('Statement of Information (D81) submitted')).toBe('Statement of information (D81) submitted');
    });

    it('should not affect numbers within string', () => {
        expect(sentenceCasePipe.transform('D81 5085 Order made')).toBe('D81 5085 order made');
    });
});
