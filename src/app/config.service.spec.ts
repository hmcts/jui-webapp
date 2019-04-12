import {inject, TestBed} from '@angular/core/testing';
import { CookieModule, CookieService } from 'ngx-cookie';
import { Injectable } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import { ConfigService } from './config.service';
import { configs, baseConfig } from '../../config';

fdescribe('Service: ConfigService', () => {
    let mockConfigs = configs;

    class MockTransferState {
        get() {
            return null;
        }
        set() {
            return null;
        }
    }

    class MockCookieService {
        get() {
            return null;
        }
        put() {}
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                CookieModule.forRoot() // <==== This line fixed it
            ],
            providers: [
                Injectable,
                ConfigService,
                {
                    provide: TransferState, useClass: MockTransferState
                },
                {
                    provide: CookieService, useClass: MockCookieService
                }
            ]
        });
    });
    it('should be created', inject([ConfigService], (service: ConfigService) => {
        const config: any = { ...baseConfig };
        const platform = config.localEnv;
        expect(platform).toBe('local');
        expect(service).toBeTruthy();
    }));
    // it('should return base url', inject([ConfigService], (service: ConfigService) => {
    //     const MockMakeStateKey = makeStateKey('config'); {
    //         return 'local';
    //     }
    //     service.CONFIG_KEY = MockMakeStateKey;
    //     this.mockDocument = {
    //         location:{
    //             host: 'test-base-url.com'
    //         }
    //     }
    //     this.mockConfData = {
    //         protocol: 'http',
    //     };
    //     service['document'] = this.mockDocument;
    //     expect(['http://test-base-url.com', 'https://test-base-url.com']).toContain(service.getBaseUrl(this.mockConfData));
    // }));
    // it('should return base url', inject([ConfigService], (service: ConfigService) => {
    //     // service.CONFIG_KEY = makeStateKey('config');
    //     // this.mockDocument = {
    //     //     location:{
    //     //         host: 'test-base-url.com'
    //     //     }
    //     // }
    //     // this.mockConfData = {
    //     //     protocol: 'http',
    //     // };
    //     // service.document = this.mockDocument;
    //     // expect(['http://test-base-url.com', 'https://test-base-url.com']).toContain(service.getBaseUrl(this.mockConfData));
    // }));
});
