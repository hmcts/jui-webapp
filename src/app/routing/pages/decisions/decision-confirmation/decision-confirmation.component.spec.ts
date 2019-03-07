import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DecisionConfirmationComponent } from './decision-confirmation.component';
import {RouterTestingModule} from '@angular/router/testing';
import {DomainModule} from '../../../../domain/domain.module';
import {SharedModule} from '../../../../shared/shared.module';
import {DecisionService} from '../../../../domain/services/decision.service';
import {BrowserTransferStateModule} from '@angular/platform-browser';
import {ConfigService} from '../../../../config.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Observable, of} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {JUIFormsModule} from '../../../../forms/forms.module';
import {GovukModule} from '../../../../govuk/govuk.module';
import {HmctsModule} from '../../../../hmcts/hmcts.module';
import {CaseService} from '../../../../domain/services/case.service';

describe('DecisionConfirmationComponent', () => {
    let component: DecisionConfirmationComponent;
    let fixture: ComponentFixture<DecisionConfirmationComponent>;
    let decisionServiceFetchSpy;
    let decision;

    beforeEach(async(() => {
        decision = {};
        TestBed.configureTestingModule({
            declarations: [
                DecisionConfirmationComponent
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
                CaseService,
                DecisionService,
                {
                    provide: ConfigService, useValue: {
                        config: {
                            api_base_url: ''
                        }
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
              })
              .compileComponents();
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
                fixture = TestBed.createComponent(DecisionConfirmationComponent);
                component = fixture.componentInstance;
                fixture.detectChanges();
              });
            });

/*    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DecisionConfirmationComponent
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
                CaseService,
                DecisionService,
                {
                    provide: ConfigService, useValue: {
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
                }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DecisionConfirmationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    xit('should create', () => {
        expect(component).toBeTruthy();
    });
});*/
