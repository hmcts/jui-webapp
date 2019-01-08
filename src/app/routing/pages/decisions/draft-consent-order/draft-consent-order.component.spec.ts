import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftConsentOrderComponent } from './draft-consent-order.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement, ViewChild} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormsService} from '../../../../shared/services/forms.service';
import {MakeDecisionComponent} from '../make-decision/make-decision.component';
import {DecisionService} from '../../../../domain/services/decision.service';
import {ConfigService} from '../../../../config.service';
import {Observable, of} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

describe('DraftConsentOrderComponent', () => {

    @Component({
        selector: `app-host-dummy-component`,
        template: `<app-draft-consent-order
            [pageitems]="pageitems"
        ></app-draft-consent-order>`
    })
    class TestDummyHostComponent {
        pageitems = {
            header: 'something',
            groups: {
                fieldset : ''
            }
        };
        @ViewChild(DraftConsentOrderComponent)
        public draftConsentOrderComponent: DraftConsentOrderComponent;
    }

    let testHostComponent: TestDummyHostComponent;
    let testHostFixture: ComponentFixture<TestDummyHostComponent>;
    let el: DebugElement;
    let de: any;
    let component: DraftConsentOrderComponent;
    let fixture: ComponentFixture<DraftConsentOrderComponent>;

    let element: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                FormsModule,
                RouterTestingModule,
                HttpClientModule
            ],
            declarations: [ DraftConsentOrderComponent, TestDummyHostComponent ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                {
                    provide: FormsService,
                    useValue: {
                        create: () => {
                            return '';
                        },
                        createFormControl: () => {
                            return '';
                        },
                        defineformControls: () => {
                            return '';
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
                        parent: {
                            params: Observable.of({caseid: '1234'}),
                            snapshot: {
                                data: {
                                    caseData: {
                                        sections: [],
                                        details: {
                                            fields: [
                                                { value: '123' },
                                                { value: 'bob v bob' }
                                            ]
                                        }
                                    }
                                }
                            }
                        },
                        params: Observable.of({caseid: '1234'})
                    }
                },
                {
                    provide: DecisionService,
                    useValue: {
                        generateDecisionUrl: () => {
                            return '';
                        },
                        fetch: () => {
                            return of({});
                        },
                        submitDecisionDraft: () => {
                            return of({});
                        },
                        updateDecisionDraft: () => {
                            return of({});
                        },
                        issueDecision:() => {
                            return of({});
                        },
                        findConsentOrderDocumentUrl: () => {
                            return '';
                        },
                        findConsentOrderDocumentId: () => {
                            return '';
                        }
                    }
                }

            ],
        })
            .compileComponents();
    }));
    beforeEach(() => {
        testHostFixture = TestBed.createComponent(TestDummyHostComponent);
        testHostComponent = testHostFixture.componentInstance;
    });
    beforeEach(() => {
        fixture = TestBed.createComponent(DraftConsentOrderComponent);
        component = fixture.componentInstance;
        element = fixture.debugElement;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should be created by angular', () => {
        expect(fixture).not.toBeNull();
    });
    it('should pageitems not load', () => {
        expect(testHostComponent.draftConsentOrderComponent.pageitems).toBeUndefined();
        // testHostFixture.detectChanges();
        // expect(testHostComponent.makeDecisionComponent.pageitems).toEqual('waste');
    });

});
