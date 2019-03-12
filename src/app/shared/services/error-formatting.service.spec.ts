import {TestBed, inject} from '@angular/core/testing';
import {ErrorFormattingService} from './error-formatting.service';

describe('ErrorFormattingService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ErrorFormattingService]
        });
    });

    const expectedRemoveRequestAndResponse = (object) => {

        delete object.response;
        delete object.request;

        return object;
    };

    /**
     * Note that we use Object.assign to clone the object. Therefore we now have two object, with
     * different memory references. Therefore if we delete a property on one object, it's only deleted
     * on that object, therefore giving meaningful tests.
     */
    it('Should remove the request and response proerties from of an object, as we should' +
        'not be displaying this within a view.', inject([ErrorFormattingService], (service: ErrorFormattingService) => {

        const errorStack = {
            'case list' : 'Error appending question rounds',
            questions: 'Error getting question rounds.',
            response: {},
            request: {},
        };

        const errorStackClone = Object.assign({}, errorStack);

        expect(service.removeRequestAndResponse(errorStack)).toEqual(expectedRemoveRequestAndResponse(errorStackClone));
    }));
});
