import { TestBed, inject } from '@angular/core/testing';

import { DecisionService } from './decision.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
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

let decisionService: DecisionService;
let httpMock: HttpTestingController;

fdescribe('DecisionService', () => {
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


        decisionService = TestBed.get(DecisionService);
        httpMock = TestBed.get(HttpTestingController);

    });



    it('should be created', () => {
        expect(decisionService)
            .toBeTruthy();
    });


    it('should contain case id',() => {
        const mockCaseId='123';
        expect(decisionService.generateDecisionUrl(mockCaseId)).toContain(mockCaseId);
            
    });


    it('should fetch',() => {
        const mockDecisionData = [{is:1},{id:2}];
        const mockCaseId='123';
        const url = decisionService.generateDecisionUrl( mockCaseId);

        decisionService.fetch(mockCaseId).subscribe(data =>{
           expect(data.length).toBe(2); 
           expect(data).toEqual(mockDecisionData); 
        });

        
        const mockReq = httpMock.expectOne(url);
        expect(mockReq.request.method).toBe('GET');
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockDecisionData);
        httpMock.verify();
            
    });



    

});
