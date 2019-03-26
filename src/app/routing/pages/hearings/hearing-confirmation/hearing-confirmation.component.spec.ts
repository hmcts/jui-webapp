import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import { HearingConfirmationComponent } from './hearing-confirmation.component';
import {RouterTestingModule} from '@angular/router/testing';
import {SharedModule} from '../../../../shared/shared.module';
import {BrowserTransferStateModule} from '@angular/platform-browser';
import {ConfigService} from '../../../../config.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {GovukModule} from '../../../../govuk/govuk.module';
import {HmctsModule} from '../../../../hmcts/hmcts.module';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ExchangeService} from '../../../../domain/services/exchange.service';
import {AuthService} from '../../../../auth/auth.service';

describe('HearingConfirmationComponent', () => {
    let component: HearingConfirmationComponent;
    let fixture: ComponentFixture<HearingConfirmationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [
                HearingConfirmationComponent
            ],
            imports: [
                SharedModule,
                BrowserTransferStateModule,
                HttpClientTestingModule,
                RouterTestingModule,
                GovukModule,
                HmctsModule
            ],
            providers: [
                {
                    provide: ConfigService, useValue: {
                        config: {
                            api_base_url: ''
                        }
                    }
                },
                {
                    provide: ExchangeService,
                    useValue: {
                        newEvent: function() {}
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
        fixture = TestBed.createComponent(HearingConfirmationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have caseId', () => {
        expect(component.caseId).toBeTruthy();
    });

    it('should call the exchangeService', inject([ExchangeService], (service: ExchangeService)  => {
        expect(service.newEvent).toBeTruthy();
    }));
});
