import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateDecisionComponent} from './create-decision.component';
import {RouterTestingModule} from '@angular/router/testing';
import {DomainModule} from '../../../../domain/domain.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {SharedModule} from '../../../../shared/shared.module';
import {BrowserTransferStateModule} from '@angular/platform-browser';
import {DecisionService} from '../../../../domain/services/decision.service';
import {ConfigService} from '../../../../config.service';
import {Observable, throwError, of} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {JUIFormsModule} from '../../../../forms/forms.module';
import {GovukModule} from '../../../../govuk/govuk.module';
import {HmctsModule} from '../../../../hmcts/hmcts.module';

describe('CreateDecisionComponent', () => {
    let component: CreateDecisionComponent;
    let fixture: ComponentFixture<CreateDecisionComponent>;
    let activatedRouteMock;

    beforeEach(async(() => {
        activatedRouteMock = {
            parent: {
                params: Observable.of({caseid: '1234'}),
                snapshot: {
                    data: {
                        caseData: {
                            id: '1234',
                            sections: [],
                            details: {
                                fields: [
                                    {value: '123'},
                                    {value: 'bob v bob'}
                                ]
                            },
                            decision: {
                                options: [
                                    {id: 'appeal-decline', name: 'Appeal Declined'}
                                ]
                            }
                        }
                    }
                }
            },
            params: Observable.of({caseid: '1234'}),
            fragment: Observable.of({})
        };

        setupModule();
    }));

    function setupModule(providers = []) {
        TestBed.configureTestingModule({
            declarations:
                [CreateDecisionComponent],
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
            providers: [DecisionService,
                {
                    provide: ConfigService, useValue: {
                        config: {
                            api_base_url: ''
                        }
                    }
                },
                {
                    provide: ActivatedRoute, useValue: activatedRouteMock
                },
                ...providers
            ]
        })
            .compileComponents();
    }

    function createComponent() {
        fixture = TestBed.createComponent(CreateDecisionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }

    beforeEach(() => {
        createComponent();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('validation', () => {
        it('form invalid when empty', () => {
            expect(component.form.valid).toBeFalsy();
            expect(component.error.decision).toEqual(false);
            expect(component.error.notes).toEqual(false);
        });

        it('decision field validity', () => {
            let errors = {};
            const decision = component.form.controls['decision'];
            expect(decision.valid).toBeFalsy();

            // Subject field is required
            errors = decision.errors || {};
            expect(errors['required']).toBeTruthy();

            // Set subject to something correct
            decision.setValue(component.options[0].id);
            errors = decision.errors || {};
            expect(errors['required']).toBeFalsy();
        });

        it('notes field validity', () => {
            let errors = {};
            const notes = component.form.controls['notes'];
            expect(notes.valid).toBeFalsy();

            // Question field is required
            errors = notes.errors || {};
            expect(errors['required']).toBeTruthy();

            // Set question to something correct
            notes.setValue('Example question');
            errors = notes.errors || {};
            expect(errors['required']).toBeFalsy();
        });
    });

    describe('if a decision already exists', () => {
        beforeEach(() => {
            activatedRouteMock.parent.snapshot.data.decision = {
                decision_award: 'decision_award',
                decision_state: {
                    state_name: 'state_name'
                },
                decision_text: 'decision_text'
            };
            TestBed.resetTestingModule();
            setupModule([
                {
                    provide: ActivatedRoute,
                    useValue: activatedRouteMock
                }
            ]);
            createComponent();
        });

        it('it should set the decision values', () => {
            expect(component.decisionAward).toEqual('decision_award');
            expect(component.decisionState).toEqual('state_name');
            expect(component.decisionText).toEqual('decision_text');
        });
    });

    describe('on form submission', () => {
        it('if form is invalid then set errors', () => {
            expect(component.error.decision).toBeFalsy();
            expect(component.error.notes).toBeFalsy();
            component.submitCallback({});
            expect(component.error.decision).toBeTruthy();
            expect(component.error.notes).toBeTruthy();
        });

        describe('if form is valid', () => {
            let updateDecisionSpy;
            let submitDecisionSpy;
            let redirectionServiceSpy;

            beforeEach(() => {
                updateDecisionSpy = spyOn(component.decisionService, 'updateDecisionDraft').and.returnValue(of({}));
                submitDecisionSpy = spyOn(component.decisionService, 'submitDecisionDraft').and.returnValue(of({}));
                redirectionServiceSpy = spyOn(component.redirectionService, 'redirect');
                component.form.controls['decision'].setValue(component.options[0].id);
                component.form.controls['notes'].setValue('notes');
            });

            xit('and no decision exists', () => {
                component.decision = null;
                component.submitCallback({
                    decision: component.options[0].id,
                    notes: 'notes'
                });
                expect(updateDecisionSpy).not.toHaveBeenCalled();
                expect(submitDecisionSpy).toHaveBeenCalledWith('1234', component.options[0].id, 'notes');
                expect(redirectionServiceSpy).toHaveBeenCalled();
            });

            it('and a decision exists', () => {
                component.decision = {};
                component.submitCallback({
                    decision: component.options[0].id,
                    notes: 'notes'
                });
                expect(submitDecisionSpy).not.toHaveBeenCalled();
                expect(updateDecisionSpy).toHaveBeenCalledWith('1234', component.options[0].id, 'notes');
                expect(redirectionServiceSpy).toHaveBeenCalled();
            });
        });
    });
});
