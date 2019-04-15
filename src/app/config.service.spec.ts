import {inject, TestBed} from '@angular/core/testing';
import { CookieModule, CookieService } from 'ngx-cookie';
import { Injectable } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import { ConfigService } from './config.service';
import { baseConfig } from '../../config';

describe('Service: ConfigService', () => {

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
});
