import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { MakeDecisionComponent } from './make-decision.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { DecisionService } from '../../../../domain/services/decision.service';

describe('MakeDecisionComponent', () => {
  let component: MakeDecisionComponent;
  let fixture: ComponentFixture<MakeDecisionComponent>;
  let decisionServiceFetchSpy;
  let decision;

  beforeEach(async(() => {
    decision = {};
    TestBed.configureTestingModule({
      declarations: [ MakeDecisionComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserTransferStateModule,
        FormsModule,
        ReactiveFormsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [ DatePipe,
        {
          provide: DecisionService,
          useValue: {
              fetch: () => {
                  return of(decision);
              },
              submitDecisionDraft: () => {
                  return of({});
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
    fixture = TestBed.createComponent(MakeDecisionComponent);
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
            component.formDraft.value.createButton = {
              toLowerCase: () => true
            };
            component.onSubmit();
            expect(decisionServiceSubmitDecisionDraftSpy).toHaveBeenCalled();
        });
    });
  });
});
