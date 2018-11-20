import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckDecisionComponent } from './check-decision.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DomainModule } from '../../../../domain/domain.module';
import { SharedModule } from '../../../../shared/shared.module';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigService } from '../../../../config.service';
import { DecisionService } from '../../../../domain/services/decision.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { JUIFormsModule } from '../../../../forms/forms.module';
import { RedirectionService } from '../../../redirection.service';
import { GovukModule } from '../../../../govuk/govuk.module';
import { HmctsModule } from '../../../../hmcts/hmcts.module';

describe('CheckDecisionComponent', () => {
    let component: CheckDecisionComponent;
    let fixture: ComponentFixture<CheckDecisionComponent>;
    let decisionServiceFetchSpy;
    let decisionServiceIssueSpy;
    let decision;

    beforeEach(async(() => {
        decision = {};
        TestBed.configureTestingModule({
            declarations: [CheckDecisionComponent],
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
                    provide: DecisionService,
                    useValue: {
                        fetch: () => {
                            return of(decision);
                        },
                        issueDecision: () => {
                            return of({});
                        }
                    }
                },
                {
                    provide: ConfigService,
                    useValue: {
                        config: {
                            api_base_url: ''
                        }
                    }
                },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            _lastPathIndex: 0
                        },
                        parent: {
                            snapshot: {
                                data: {
                                    caseData: {
                                        id: '1234',
                                        decision: {
                                            options: [
                                                { id: 'test', name: 'test' }
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        decisionServiceFetchSpy = spyOn(
            TestBed.get(DecisionService),
            'fetch'
        ).and.returnValue(of({}));
        decisionServiceIssueSpy = spyOn(
            TestBed.get(DecisionService),
            'issueDecision'
        ).and.returnValue(of({}));
        fixture = TestBed.createComponent(CheckDecisionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    xit('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('on form submission', () => {
        let redirectionServiceSpy;

        describe('if form is valid', () => {
            beforeEach(() => {
                redirectionServiceSpy = spyOn(
                    TestBed.get(RedirectionService),
                    'redirect'
                );
            });

            // it('should issue the decision', () => {
            //     component.submitCallback({});
            //     expect(decisionServiceIssueSpy).toHaveBeenCalledWith('1234', {});
            //     expect(redirectionServiceSpy).toHaveBeenCalled();
            // });
        });
    });
});
