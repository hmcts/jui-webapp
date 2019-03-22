import {inject, TestBed} from '@angular/core/testing';
import { ANGULAR2_COOKIE_PROVIDERS } from '../../src/core';
import { CookieModule, CookieService } from 'ngx-cookie';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { configs, baseConfig } from '../../config';
import { DOCUMENT } from '@angular/common';
import {ConfigService} from './config.service';

xdescribe('Service: ConfigService', () => {
    const mockDocument = configs;
    const mockConfData = baseConfig;
    const mockDocument = DOCUMENT;
    let cookieService: CookieService;

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

        let injector = ReflectiveInjector.resolveAndCreate(ANGULAR2_COOKIE_PROVIDERS);
        cookieService = injector.get(CookieService);
        cookieService.removeAll();

    });
    it('should be created', inject([ConfigService, CookieService], (service: ConfigService) => {
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
