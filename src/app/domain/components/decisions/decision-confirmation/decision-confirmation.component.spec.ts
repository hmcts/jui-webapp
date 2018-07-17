import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionConfirmationComponent } from './decision-confirmation.component';
import {RouterTestingModule} from '@angular/router/testing';
import {DomainModule} from '../../../domain.module';
import {SharedModule} from '../../../../shared/shared.module';
import {DecisionService} from '../../../services/decision.service';
import {BrowserTransferStateModule} from '@angular/platform-browser';
import {ConfigService} from '../../../../config.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

describe('DecisionConfirmationComponent', () => {
    let component: DecisionConfirmationComponent;
    let fixture: ComponentFixture<DecisionConfirmationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [DomainModule, SharedModule, BrowserTransferStateModule, HttpClientTestingModule, RouterTestingModule],
            providers: [                DecisionService,
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
                                                { value: 'bob vs bob' }
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

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
