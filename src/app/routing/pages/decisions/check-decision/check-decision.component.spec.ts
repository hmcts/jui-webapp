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
import { GovukModule } from '../../../../govuk/govuk.module';
import { HmctsModule } from '../../../../hmcts/hmcts.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationService } from '../../../../shared/services/validation.service';
import {AnnotationStoreService} from '../../../../shared/components/hmcts-em-viewer-ui/data/annotation-store.service';

describe('CheckDecisionComponent', () => {
    let component: CheckDecisionComponent;
    let fixture: ComponentFixture<CheckDecisionComponent>;
    let decisionServiceFetchSpy;
    let decision;
    let annotations;

    beforeEach(async(() => {
        decision = {};
        annotations = {'test': 'annotation'};
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
                HmctsModule,
                FormsModule,
                ReactiveFormsModule
            ],
            providers: [
                {
                    provide: AnnotationStoreService,
                    useValue: {
                        fetchData: () => {
                            return of(annotations);
                        }
                    }
                },
                {
                    provide: DecisionService,
                    useValue: {
                        fetch: () => {
                            return of(decision);
                        },
                        submitDecisionDraft: () => {
                            return of({});
                        },
                        findConsentOrderDocumentId: () => {
                            return '1234567';
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
                    provide: ValidationService,
                    useValue: {
                        createFormGroupValidators: () => {}
                    }
                },
                {
                    provide: ActivatedRoute,
                    useValue: ({
                        snapshot: {
                            _lastPathIndex: 0,
                            url: [{
                                path: 'dummy'
                            }],
                            parent: {
                                data: {
                                    caseData: {
                                        id: '1234',
                                        case_jurisdiction: 'DIVORCE',
                                        case_type_id: 'FinancialRemedyMVP2',
                                        decision: {
                                            options: [
                                                { id: 'test', name: 'test' }
                                            ]
                                        }
                                    }
                                }
                            }
                        },
                        parent: {
                            data: of({
                                caseData: {
                                    id: '1234',
                                    case_jurisdiction: 'DIVORCE',
                                    case_type_id: 'FinancialRemedyMVP2',
                                    decision: {
                                        options: [
                                            { id: 'test', name: 'test' }
                                        ]
                                    }
                                }
                            })
                        }
                    } as any) as ActivatedRoute

                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        decisionServiceFetchSpy = spyOn(
            TestBed.get(DecisionService),
            'fetch'
        ).and.returnValue(of({
            meta: {
            },
            formValues: {}
        }));
        fixture = TestBed.createComponent(CheckDecisionComponent);
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

        describe('if form is valid', () => {
            let decisionServiceSubmitDecisionDraftSpy;

            beforeEach(() => {
                decisionServiceSubmitDecisionDraftSpy = spyOn(
                    TestBed.get(DecisionService),
                    'submitDecisionDraft'
                ).and.returnValue(of({}));
            });

            it('should submit the decision', () => {
                component.onSubmit({});
                expect(decisionServiceSubmitDecisionDraftSpy).toHaveBeenCalled();
            });
        });
    });

    it('should check whether section exists', () => {
        component.pageValues = {
            visitedPages: {
                section: true
            }
        };
        component.jurId = 'DIVORCE';
        component.typeId = 'FinancialRemedyMVP2';

        expect(component.isSectionExist('section')).toBeTruthy();

    });

    it('should check has actvities', () => {
        const activities = [
            { type: 'dummy' }
        ];

        component.pageValues = {
            dummy: true
        };

        expect(component.hasActivities(activities)).toBeTruthy();
        expect(component.hasActivities(activities)).toBe(true);
    });
});
