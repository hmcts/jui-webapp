import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ConfigService } from '../../../config.service';
import { TransferState } from '@angular/platform-browser';
import { DocumentStoreService } from './document-store.service';
import {CookieService, CookieOptionsProvider, CookieModule} from 'ngx-cookie';
import {RouterTestingModule} from '@angular/router/testing';
import {Observable} from 'rxjs/Observable';

describe('DocumentStoreService', () => {
    beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [ HttpClientModule, RouterTestingModule, CookieModule.forRoot()],
        providers: [DocumentStoreService, TransferState, ConfigService, CookieService, CookieOptionsProvider]
    });
    });

    it('should be created', inject([DocumentStoreService], (service: DocumentStoreService) => {
        expect(service).toBeTruthy();
    }));

    it('should convert URL to proxy', inject([DocumentStoreService, ConfigService], (service: DocumentStoreService, configService: ConfigService ) => {
        const url = `${configService.config.api_base_url}/test/parameters`;
        const convertUrlToProxy = service.convertUrlToProxy(url);
        expect(convertUrlToProxy).toBe(`${configService.config.api_base_url}/api/dm-store/test/parameters`);
    }));

    it('should post file to backend', inject([DocumentStoreService, ConfigService], (service: DocumentStoreService, configService: ConfigService ) => {
        const mockFile = new File([], 'file.bin');
        const classification = 'test-string';
        const metaDate = new Map<string, string>();
        metaDate.set('key1', 'value1');
        metaDate.set('key2', 'value3');
        metaDate.set('key3', 'value3');
        const postFile = service.postFile(classification, metaDate, mockFile);
        expect(postFile).toEqual(jasmine.any(Observable));
    }));
});
