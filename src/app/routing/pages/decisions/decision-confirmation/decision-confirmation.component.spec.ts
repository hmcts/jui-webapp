import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DecisionConfirmationComponent } from './decision-confirmation.component';
import {RouterTestingModule} from '@angular/router/testing';
import {DomainModule} from '../../../../domain/domain.module';
import {SharedModule} from '../../../../shared/shared.module';
import {DecisionService} from '../../../../domain/services/decision.service';
import {BrowserTransferStateModule} from '@angular/platform-browser';
import {ConfigService} from '../../../../config.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {JUIFormsModule} from '../../../../forms/forms.module';
import {GovukModule} from '../../../../govuk/govuk.module';
import {HmctsModule} from '../../../../hmcts/hmcts.module';
import {ExchangeService} from '../../../../domain/services/exchange.service';

describe('DecisionConfirmationComponent', () => {
    let component: DecisionConfirmationComponent;
    let fixture: ComponentFixture<DecisionConfirmationComponent>;
    beforeEach(async(() => {
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
                ExchangeService,
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
                        snapshot: {
                            url: [
                                {
                                    path: 'final-decision'
                                }
                            ]
                        },
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
                            },
                            data: Observable.of({
                                caseData: {
                                    sections: [],
                                    details: {
                                        fields: [
                                            { value: '123' },
                                            { value: 'bob v bob' }
                                        ]
                                    }
                                }
                            })
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

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have empty display object values header and text', () => {
        expect(JSON.stringify(component.display)).toBe(JSON.stringify({header: '', text: ''}));
    });

    it('should set "tribunal page" data if "tribunal page" visited', () => {
        const visitedPages = {
            'preliminary-advanced': true
        }
        component.setPageData(visitedPages);
        expect(JSON.stringify(component.display)).toBe(JSON.stringify({header: "Tribunal's view submitted", text: "Your tribunal's view will be sent to the appelant and DWP."}));
    });

    it('should set "final decision" page data if "final decision" page visited', () => {
        const visitedPages = {
            'final-decision': true
        }
        component.setPageData(visitedPages);
        expect(JSON.stringify(component.display)).toBe(JSON.stringify({header: "Tribunal's decision submitted", text: "Your tribunal's decision will be sent to the appelant and DWP."}));
    });
});
