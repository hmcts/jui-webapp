import { TestBed, inject } from '@angular/core/testing';

import { DecisionService } from './decision.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigService } from '../../config.service';
import { RouterTestingModule } from '@angular/router/testing';
import { DomainModule } from '../domain.module';
import { SharedModule } from '../../shared/shared.module';
import { BrowserTransferStateModule } from '@angular/platform-browser';

const configMock = {
    config: {
        api_base_url: ''
    }
};

describe('DecisionService', () => {
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
                DecisionService,
                {
                    provide: ConfigService,
                    useValue: configMock
                }
            ]
        });
    });

    it('should be created', inject([DecisionService], (service: DecisionService) => {
        expect(service)
            .toBeTruthy();
    }));
});
