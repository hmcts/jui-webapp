import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {MakeDecisionComponent } from './make-decision.component';
import {Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement, Input, ViewChild} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {FormsService} from '../../../../../shared/services/forms.service';
import {DecisionService} from '../../../../../domain/services/decision.service';
import {ConfigService} from '../../../../../config.service';

describe('MakeDecisionComponent', () => {

    @Component({
        selector: `app-host-dummy-component`,
        template: `<app-make-decision
            [pageitems]="pageitems"
        ></app-make-decision>`
    })
    class TestDummyHostComponent {
        pageitems = {
            header: 'something',
            groups: {
                fieldset : ''
            }
        };
        @ViewChild(MakeDecisionComponent)
        public makeDecisionComponent: MakeDecisionComponent;
    }

    let testHostComponent: TestDummyHostComponent;
    let testHostFixture: ComponentFixture<TestDummyHostComponent>;
    let el: DebugElement;
    let de: any;
    let component: MakeDecisionComponent;
    let fixture: ComponentFixture<MakeDecisionComponent>;

    let element: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                FormsModule,
                RouterTestingModule,
                HttpClientModule
            ],
            declarations: [ MakeDecisionComponent, TestDummyHostComponent ],
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
                    provide: ActivatedRoute, useValue: {
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
        fixture = TestBed.createComponent(MakeDecisionComponent);
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
        expect(testHostComponent.makeDecisionComponent.pageitems).toBeUndefined();
        // testHostFixture.detectChanges();
        // expect(testHostComponent.makeDecisionComponent.pageitems).toEqual('waste');
    });

});
