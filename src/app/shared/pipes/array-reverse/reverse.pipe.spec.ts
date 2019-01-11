import {ReversePipe} from './reverse.pipe';

describe('Pipe: ReversePipe', () => {
    let pipe: ReversePipe;
    beforeEach(() => {
        pipe = new ReversePipe();
    });
    it('providing no value returns fallback', () => {
        expect(pipe.transform('')).toBe(undefined);
    });
    it('providing an array check that type is correct', () => {
        expect(pipe.transform('2dasdasdasdad') ).toBe(undefined);
    });
    it('providing a value returns correct ouput', () => {
        const example = ['one', 'two', 'three'];
        expect(pipe.transform(example)).toBe(example.reverse());
    });
});
