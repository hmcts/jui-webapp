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
        };

        expect(service.createMinimalErrorStack(errorStack)).toEqual(errorStack);
    }));
});
