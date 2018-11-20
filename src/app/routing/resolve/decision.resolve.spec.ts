import { TestBed, inject } from '@angular/core/testing';
import { DecisionResolve} from './decision.resolve';
import { DecisionService } from '../../domain/services/decision.service';
import {ActivatedRouteSnapshot} from '@angular/router';
import {of} from 'rxjs';

describe('DecisionResolve', () => {
    let decisionServiceMock;

    beforeEach(() => {
        decisionServiceMock = {
            fetch: () => of({})
        };

        TestBed.configureTestingModule({
            providers: [
                DecisionResolve,
                {
                    provide: DecisionService,
                    useValue: decisionServiceMock
                }
            ]
        });
    });

    it('should be created', inject([DecisionResolve], (resolve: DecisionResolve) => {
        expect(resolve).toBeTruthy();
    }));

    xit('should fetch a decision', inject([DecisionResolve], (resolve: DecisionResolve) => {
        const decisionServiceInstance = TestBed.get(DecisionService);
        const decisionServiceSpy = spyOn(decisionServiceInstance, 'fetch').and.returnValue(of({}));
        const route = new ActivatedRouteSnapshot();
        resolve.resolve(route);
        expect(decisionServiceSpy).toHaveBeenCalled();
    }));
});
