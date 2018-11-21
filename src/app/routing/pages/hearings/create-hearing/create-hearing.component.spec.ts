import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHearingComponent } from './create-hearing.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserTransferStateModule} from '@angular/platform-browser';
import {SharedModule} from '../../../../shared/shared.module';
import {ConfigService} from '../../../../config.service';
import {GovukModule} from '../../../../govuk/govuk.module';
import {HmctsModule} from '../../../../hmcts/hmcts.module';
import {JUIFormsModule} from '../../../../forms/forms.module';
import {DomainModule} from '../../../../domain/domain.module';
import {HearingService} from '../../../../domain/services/hearing.service';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import { mockCaseData } from './mock/create-hearing.mock';

describe('CreateHearingComponent', () => {
    let component: CreateHearingComponent;
    let fixture: ComponentFixture<CreateHearingComponent>;
    let activatedRouteMock;

    beforeEach(async(() => {
        activatedRouteMock = {
            parent: {
                params: Observable.of({caseid: '1234'}),
                snapshot: {
                    data: {
                        caseData: mockCaseData
                    }
                }
            },
            params: Observable.of({caseid: '1234'}),
            fragment: Observable.of({})
        };

        setupModule();
    }));

    function setupModule(providers = []) {
        TestBed.configureTestingModule({
            declarations: [
                CreateHearingComponent
            ],
            imports: [
                JUIFormsModule,
                DomainModule,
                SharedModule,
                BrowserTransferStateModule,
                HttpClientTestingModule,
                RouterTestingModule,
                GovukModule,
                HmctsModule
            ],
            providers: [HearingService,
                {
                    provide: ConfigService, useValue: {
                        config: {
                            api_base_url: ''
                        }
                    }
                },
                {
                    provide: ActivatedRoute, useValue: activatedRouteMock
                },
                ...providers
            ]
        })
            .compileComponents();
    }

    function createComponent() {
        fixture = TestBed.createComponent(CreateHearingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }

    beforeEach(() => {
        createComponent();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('validation', () => {
        it('form invalid when empty', () => {
            expect(component.form.valid).toBeFalsy();
            expect(component.error.notes).toEqual(false);
        });

        it('relist reason field validity', () => {
            let errors = {};
            const notes = component.form.controls['notes'];
            expect(notes.valid).toBeFalsy();

            errors = notes.errors || {};
            expect(errors['required']).toBeTruthy();

            notes.setValue('Request for a hearing to be listed');
            errors = notes.errors || {};
            expect(errors['required']).toBeFalsy();
        });
    });
});
