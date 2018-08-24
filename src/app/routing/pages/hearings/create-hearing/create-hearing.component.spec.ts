import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHearingComponent } from './create-hearing.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserTransferStateModule} from '@angular/platform-browser';
import {SharedModule} from '../../../../shared/shared.module';
import {DecisionService} from '../../../../domain/services/decision.service';
import {ConfigService} from '../../../../config.service';
import {GovukModule} from '../../../../govuk/govuk.module';
import {HmctsModule} from '../../../../hmcts/hmcts.module';

describe('CreateHearingComponent', () => {
    let component: CreateHearingComponent;
    let fixture: ComponentFixture<CreateHearingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                CreateHearingComponent
            ],
            imports: [
                SharedModule,
                BrowserTransferStateModule,
                HttpClientTestingModule,
                RouterTestingModule,
                GovukModule,
                HmctsModule
            ],
            providers: [DecisionService, {
                provide: ConfigService, useValue: {
                    config: {
                        api_base_url: ''
                    }
                }
            }]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateHearingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
