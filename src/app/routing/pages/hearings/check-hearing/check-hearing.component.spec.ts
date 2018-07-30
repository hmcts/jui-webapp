import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckHearingComponent } from './check-hearing.component';
import {RouterTestingModule} from '@angular/router/testing';
import {SharedModule} from '../../../../shared/shared.module';
import {DecisionService} from '../../../../domain/services/decision.service';
import {BrowserTransferStateModule} from '@angular/platform-browser';
import {ConfigService} from '../../../../config.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('CheckHearingComponent', () => {
  let component: CheckHearingComponent;
  let fixture: ComponentFixture<CheckHearingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [
            CheckHearingComponent
        ],
        imports: [SharedModule, BrowserTransferStateModule, HttpClientTestingModule, RouterTestingModule],
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
    fixture = TestBed.createComponent(CheckHearingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
