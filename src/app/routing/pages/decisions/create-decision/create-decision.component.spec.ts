import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateDecisionComponent} from './create-decision.component';
import {RouterTestingModule} from '@angular/router/testing';
import {DomainModule} from '../../../../domain/domain.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {SharedModule} from '../../../../shared/shared.module';
import {BrowserTransferStateModule} from '@angular/platform-browser';
import {DecisionService} from '../../../../domain/services/decision.service';
import {ConfigService} from '../../../../config.service';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {JUIFormsModule} from "../../../../forms/forms.module";

describe('CreateDecisionComponent', () => {
    let component: CreateDecisionComponent;
    let fixture: ComponentFixture<CreateDecisionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations:
                [CreateDecisionComponent],
            imports: [
                JUIFormsModule,
                DomainModule,
                SharedModule,
                BrowserTransferStateModule,
                HttpClientTestingModule,
                RouterTestingModule
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
                    provide: ActivatedRoute, useValue: {
                    parent: {
                        params: Observable.of({caseid: '1234'}),
                        snapshot: {
                            data: {
                                caseData: {
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
                }
                }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateDecisionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
