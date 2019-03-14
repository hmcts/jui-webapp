import { CookieModule, CookieService } from 'ngx-cookie';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { configs, baseConfig } from '../../config';
import {ConfigService} from './config.service';
import {inject, TestBed} from '@angular/core/testing';

describe('Service: ConfigService', () => {
    const mockDocument = configs;
    const mockConfData = baseConfig;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                CookieModule.forRoot() // <==== This line fixed it
            ],
            providers: [
                ConfigService,
                TransferState,
                CookieService
            ]

        });

    });
    it('should be created', inject([ConfigService], (service: ConfigService) => {
        service.CONFIG_KEY = makeStateKey('config');
        expect(service).toBeTruthy();
    }));
    it('should return base url', inject([ConfigService], (service: ConfigService) => {
        service.CONFIG_KEY = makeStateKey('config');
        this.mockDocument = {
            location:{
                host: 'test-base-url.com'
            }
        }
        this.mockConfData = {
            protocol: 'http',
        };
        service.document = this.mockDocument;
        expect(service.getBaseUrl(this.mockConfData)).toBe('http://test-base-url.com');
    }));
});
