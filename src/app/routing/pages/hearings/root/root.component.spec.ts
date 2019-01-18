import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HearingRootComponent} from './root.component';
import {RouterTestingModule} from '@angular/router/testing';
import {DomainModule} from '../../../../domain/domain.module';
import {SharedModule} from '../../../../shared/shared.module';
import {Observable, of} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {GovukModule} from '../../../../govuk/govuk.module';
import {HmctsModule} from '../../../../hmcts/hmcts.module';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('HearingRootComponent', () => {
    let component: HearingRootComponent;
    let fixture: ComponentFixture<HearingRootComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                HearingRootComponent
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                DomainModule,
                SharedModule,
                RouterTestingModule,
                GovukModule,
                HmctsModule
            ],
            providers: [
                {
                    provide: ActivatedRoute, useValue: {
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
                                    }
                                }
                            }
                        },
                        firstChild: {
                            url: of([
                                {path: 'dummy'}
                            ])
                        }
                    }
                }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HearingRootComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
