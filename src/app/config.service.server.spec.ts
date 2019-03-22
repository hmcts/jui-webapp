import { inject, TestBed } from '@angular/core/testing';
import { Injectable, PLATFORM_ID } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { config } from '../../config';
import { ServerConfigService } from './config.service.server';
//import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';

fdescribe('Service: ServerConfigService', () => {

    let service: ServerConfigService;
    let MockTransferState: TransferState;
    let MockREQUEST: {};
    let MockRESPONSE: {};

    beforeEach(() => {
        MockTransferState = new TransferState();
        service = new ServerConfigService(MockTransferState, MockREQUEST, MockRESPONSE, 'local');
    });

    afterEach(() => {
        service = null;
    });

    //
    // const mockConfig = config;
    //
    // beforeEach(() => {
    //
    //     TestBed.configureTestingModule({
    //         providers: [
    //             Injectable,
    //             TransferState,
    //             ServerConfigService
    //         ]
    //     });
    // });
    // it('should be created', inject([ServerConfigService], (service: ServerConfigService) => {
    //     service.CONFIG_KEY = makeStateKey(mockConfig);
    //     service.config = service.state.get(this.CONFIG_KEY, null as any);
    //     expect(service).toBeTruthy();
    //
    //     service.config = null;
    //     expect(service).not.toBeTruthy();
    // }));
    // xit('should return base url', inject([ServerConfigService], (service: ServerConfigService) => {
    //     service.CONFIG_KEY = makeStateKey(mockConfig);
    //     this.mockRequest = {
    //         location:{
    //             host: 'test-base-url.com'
    //         }
    //     }
    //     const conf = {protocol: 'http'};
    //
    //     expect(service.getBaseUrl(conf)).toBe('http://test-base-url.com');
    // }));
});
