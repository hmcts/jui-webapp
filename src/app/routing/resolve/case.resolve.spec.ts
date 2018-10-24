import { TestBed, inject } from '@angular/core/testing';
import { CaseResolve } from './case.resolve';
import { CaseService} from '../../domain/services/case.service';
import {ActivatedRouteSnapshot} from '@angular/router';
import {of} from 'rxjs';

describe('CaseResolve', () => {
    let caseServiceMock;

    beforeEach(() => {
        caseServiceMock = {
            fetch: () => of({})
        };

        TestBed.configureTestingModule({
            providers: [
                CaseResolve,
                {
                    provide: CaseService,
                    useValue: caseServiceMock
                }
            ]
        });
    });

    it('should be created', inject([CaseResolve], (resolve: CaseResolve) => {
        expect(resolve).toBeTruthy();
    }));

    it('should fetch a decision', inject([CaseResolve], (resolve: CaseResolve) => {
        const caseServiceInstance = TestBed.get(CaseService);
        const caseServiceSpy = spyOn(caseServiceInstance, 'fetch').and.returnValue(of({}));
        const route = new ActivatedRouteSnapshot();
        resolve.resolve(route);
        expect(caseServiceSpy).toHaveBeenCalled();
    }));
});
