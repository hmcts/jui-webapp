import {of} from 'rxjs';
import {TestBed, inject} from '@angular/core/testing';
import {HearingResolve} from './hearing.resolve';
import {HearingService} from '../../domain/services/hearing.service';
import {ActivatedRouteSnapshot} from '@angular/router';

describe('HearingResolve', () => {
    let hearingServiceMock;

    beforeEach(() => {
        hearingServiceMock = {
            fetch: () => of({})
        };

        TestBed.configureTestingModule({
            providers: [
                HearingResolve,
                {
                    provide: HearingService,
                    useValue: hearingServiceMock
                }
            ]
        });
    });

    it('should be created', inject([HearingResolve], (resolve: HearingResolve) => {
        expect(resolve).toBeTruthy();
    }));

    it('should fetch hearing', inject([HearingResolve], (resolve: HearingResolve) => {
        const hearingServiceInstance = TestBed.get(HearingService);
        const hearingServiceSpy = spyOn(hearingServiceInstance, 'fetch').and.returnValue(of({}));
        const route = new ActivatedRouteSnapshot();
        resolve.resolve(route);
        expect(hearingServiceSpy).toHaveBeenCalled();
    }));
});
