import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckHearingComponent } from './check-hearing.component';
import {RouterTestingModule} from '@angular/router/testing';
import {SharedModule} from '../../../../shared/shared.module';
import {BrowserTransferStateModule} from '@angular/platform-browser';
import {ConfigService} from '../../../../config.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {GovukModule} from '../../../../govuk/govuk.module';
import {HmctsModule} from '../../../../hmcts/hmcts.module';
import {HearingService} from '../../../../domain/services/hearing.service';
import {JUIFormsModule} from '../../../../forms/forms.module';
import {ActivatedRoute} from '@angular/router';
import {Observable, of, throwError} from 'rxjs';
import {DomainModule} from '../../../../domain/domain.module';
import {RedirectionService} from '../../../redirection.service';
import {mockCaseData} from './mock/check-hearing.mock';

class MockHearingService {
    isError = false;
    currentMessage = of({});

    listForHearing(caseId: string, relist_reason: string): Observable<any> {
        if (this.isError) {
            return throwError({});
        }
        return of({});
    }
}

describe('CheckHearingComponent', () => {
    let component: CheckHearingComponent;
    let fixture: ComponentFixture<CheckHearingComponent>;
    const mockHearingService  = new MockHearingService();

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                CheckHearingComponent
            ],
            imports: [
                JUIFormsModule,
                DomainModule,
                SharedModule,
                BrowserTransferStateModule,
                HttpClientTestingModule,
                RouterTestingModule,
                GovukModule,
                HmctsModule
            ],
            providers: [
                {
                    provide: HearingService, useValue: mockHearingService
                },
                {
                    provide: ConfigService, useValue: {
                        config: {
                            api_base_url: ''
                        }
                    }
                },
                {
                    provide: ActivatedRoute, useValue: {
                        snapshot: {
                            _lastPathIndex: 0
                        },
                        parent: {
                            snapshot: {
                                data: {
                                    caseData: mockCaseData
                                }
                            }
                        }
                    }
                }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CheckHearingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('on form submission', () => {
        let redirectionServiceSpy;

        beforeEach(() => {
            redirectionServiceSpy = spyOn(TestBed.get(RedirectionService), 'redirect');
        });

        it('should re-list for hearing', () => {
            component.submitCallback({});
            expect(redirectionServiceSpy).toHaveBeenCalled();
        });

        it('should not redirect in the event of error', () => {
            mockHearingService.isError = true;

            component.submitCallback({});
            expect(redirectionServiceSpy).toHaveBeenCalledTimes(0);
            expect(component.error).toBe(true);
        });
    });
});
