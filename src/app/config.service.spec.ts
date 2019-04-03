import {inject, TestBed} from '@angular/core/testing';
import { CookieModule, CookieService } from 'ngx-cookie';
import { Injectable } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { configs, baseConfig } from '../../config';
import { ConfigService } from './config.service';

describe('Service: ConfigService', () => {
    const mockDocument = configs;
    const mockConfData = baseConfig;
    const config: any = { ...baseConfig };

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                CookieModule.forRoot() // <==== This line fixed it
            ],
            providers: [
                Injectable,
                ConfigService,
                TransferState,
                CookieService
            ]
        });
    });
    it('should be created', inject([ConfigService], (service: ConfigService) => {
        service.CONFIG_KEY = makeStateKey('config');
        service.state.get(this.CONFIG_KEY, null as any);
        service.cookieService.put('test', '1');
        const platform = service.cookieService.get(config.platformCookie) || config.localEnv;
        expect(service).toBeTruthy();
        expect(platform).toBe('local');
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
        expect(['http://test-base-url.com', 'https://test-base-url.com']).toContain(service.getBaseUrl(this.mockConfData));
    }));
});
