import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CookieModule } from 'ngx-cookie';
import { DecisionRootComponent } from './root.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DomainModule } from '../../../../domain/domain.module';
import { SharedModule } from '../../../../shared/shared.module';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { GovukModule } from '../../../../govuk/govuk.module';
import { HmctsModule } from '../../../../hmcts/hmcts.module';

describe('DecisionRootComponent', () => {
    let component: DecisionRootComponent;
    let fixture: ComponentFixture<DecisionRootComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                DecisionRootComponent
            ],
            imports: [
                CookieModule.forRoot(),
                DomainModule,
                SharedModule,
                RouterTestingModule,
                GovukModule,
                HmctsModule
            ],
            providers: [
                {
                    provide: ActivatedRoute, useValue: {
                        params: Observable.of({ caseid: '1234' }),
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
                    }
                }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DecisionRootComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
