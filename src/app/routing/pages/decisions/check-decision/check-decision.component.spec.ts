import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckDecisionComponent } from './check-decision.component';
import {RouterTestingModule} from '@angular/router/testing';
import {DomainModule} from '../../../../domain/domain.module';
import {SharedModule} from '../../../../shared/shared.module';
import {BrowserTransferStateModule} from '@angular/platform-browser';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CaseService} from '../../../../domain/services/case.service';
import {ConfigService} from '../../../../config.service';
import {DecisionService} from '../../../../domain/services/decision.service';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {JUIFormsModule} from "../../../../forms/forms.module";

describe('CheckDecisionComponent', () => {
    let component: CheckDecisionComponent;
    let fixture: ComponentFixture<CheckDecisionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                CheckDecisionComponent
            ],
            imports: [JUIFormsModule, DomainModule, SharedModule, BrowserTransferStateModule, HttpClientTestingModule, RouterTestingModule],
            providers: [
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
                            _lastPathIndex: 0
                        },
                        parent: {
                            params: Observable.of({caseid: '1234'}),
                            snapshot: {
                                data: {
                                    caseData: {
                                        decision: {
                                            options: [
                                                {id: 'test', name: 'test'}
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
        fixture = TestBed.createComponent(CheckDecisionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
