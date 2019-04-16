import {TestBed, inject} from '@angular/core/testing';
import {ErrorFormattingService} from './error-formatting.service';

describe('ErrorFormattingService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ErrorFormattingService]
        });
    });


    it('Should remove the request and response proerties from of an object, as we should' +
        'not be displaying this within a view.', inject([ErrorFormattingService], (service: ErrorFormattingService) => {

        const errorStack = {
            'case list' : 'Error appending question rounds',
            questions: 'Error getting question rounds.',
            response: {},
            request: {},
            return: {},
        };

        const expectedErrorStack = {
            'case list' : 'Error appending question rounds',
            questions: 'Error getting question rounds.',
        };

        expect(service.createMinimalErrorStack(errorStack)).toEqual(expectedErrorStack);
    }));

    it('Should output a human readable error stack, so that a User can take a snapshot of it, and send it to us ' +
        'for debugging purposes.', inject([ErrorFormattingService], (service: ErrorFormattingService) => {

        const minimalErrorStack = {
            'case-list': 'ER_CASES',
            'ccd-store': 'ER_CASES_JUR_SSCS'
        };

        expect(service.createHumanReadableStack(minimalErrorStack)).toEqual('ER_CASES, ER_CASES_JUR_SSCS');
    }));

    it('Should output an empty string if there is no error stack.', inject([ErrorFormattingService], (service: ErrorFormattingService) => {

        const minimalErrorStack = {};

        expect(service.createHumanReadableStack(minimalErrorStack)).toEqual('');
    }));
});
