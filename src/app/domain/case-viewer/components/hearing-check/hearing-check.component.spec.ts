import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HearingCheckComponent } from './hearing-check.component';
import {RouterTestingModule} from '@angular/router/testing';
import {DomainModule} from '../../../domain.module';
import {SharedModule} from '../../../../shared/shared.module';
import {DecisionService} from '../../../services/decision.service';
import {BrowserTransferStateModule} from '@angular/platform-browser';
import {ConfigService} from '../../../../config.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('HearingCheckComponent', () => {
  let component: HearingCheckComponent;
  let fixture: ComponentFixture<HearingCheckComponent>;

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
        }]    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HearingCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
