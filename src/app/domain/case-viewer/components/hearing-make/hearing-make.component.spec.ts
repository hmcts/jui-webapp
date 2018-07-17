import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HearingMakeComponent } from './hearing-make.component';
import {RouterTestingModule} from '@angular/router/testing';
import {DomainModule} from '../../../domain.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserTransferStateModule} from '@angular/platform-browser';
import {SharedModule} from '../../../../shared/shared.module';
import {DecisionService} from '../../../services/decision.service';
import {ConfigService} from '../../../../config.service';

describe('HearingMakeComponent', () => {
    let component: HearingMakeComponent;
    let fixture: ComponentFixture<HearingMakeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [DomainModule, SharedModule, BrowserTransferStateModule, HttpClientTestingModule, RouterTestingModule],
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
        fixture = TestBed.createComponent(HearingMakeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
