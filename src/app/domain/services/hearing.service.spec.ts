import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConfigService } from '../../config.service';
import { RouterTestingModule } from '@angular/router/testing';
import { DomainModule } from '../domain.module';
import { SharedModule } from '../../shared/shared.module';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { HearingService } from './hearing.service';

const configMock = {
    config: {
        api_base_url: ''
    }
};

describe('HearingService', () => {
    let hearingService: HearingService;
    let httpMock: HttpTestingController;

    const fetchResult = { online_hearing_state: 'continuous_online_hearing_relisted_draft', reason: 'test' };
    const caseId = '123';
    let url;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                DomainModule,
                SharedModule,
                BrowserTransferStateModule,
                HttpClientTestingModule,
                RouterTestingModule
            ],
            providers: [
                HearingService,
                {
                    provide: ConfigService,
                    useValue: configMock
                }
            ]
        });
        hearingService = TestBed.get(HearingService);
        httpMock = TestBed.get(HttpTestingController);
        url = hearingService.generateHearingsUrl(caseId);
    });

    it('should be created', () => {
        expect(hearingService).toBeTruthy();
    });

    it('should return hearing', () => {
        hearingService.fetch(caseId).subscribe(value => {
            expect(value).toEqual(fetchResult);
        });

        httpMock.expectOne(url).flush(fetchResult, { status: 200, statusText: 'Ok' });
    });

    it('should save list-for-hearing in draft mode', () => {
        hearingService.draftListForHearing(caseId, fetchResult.reason).subscribe();

        httpMock.expectOne(req => {
                const body = req.body;

                return req.method === 'POST'
                    && req.url === url
                    && body.online_hearing_state === fetchResult.online_hearing_state
                    && body.reason === fetchResult.reason;
            });
    });

    it('should save list-for-hearing', () => {
        hearingService.listForHearing(caseId, fetchResult.reason).subscribe();

        httpMock.expectOne(req => {
            const body = req.body;

            return req.method === 'POST'
                && req.url === url
                && body.online_hearing_state === 'continuous_online_hearing_relisted'
                && body.reason === fetchResult.reason;
        });
    });

});
