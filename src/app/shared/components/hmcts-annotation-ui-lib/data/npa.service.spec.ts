import { TestBed, inject, async } from '@angular/core/testing';
import { ApiHttpService } from './api-http.service';
import { NpaService } from './npa.service';
import { Observable } from 'rxjs';

class MockApiHttpService {
    documentTask(dmDocumentId, outputDmDocument) {}
}

describe('NpaService' , () => {

    const mockApiHttpService = new MockApiHttpService();
    beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
              NpaService,
              { provide: ApiHttpService, useFactory: () => mockApiHttpService} 
            ]
        });
      });

    it('should be created', inject([NpaService], (service: NpaService) => {
        expect(service).toBeTruthy();
    }));

    it('should invoke the http service to send document task', inject([NpaService], (service: NpaService) => {
        spyOn(mockApiHttpService, 'documentTask');
        service.exportPdf('dmDocumentId', 'outputDocumentId');
        expect(mockApiHttpService.documentTask).toHaveBeenCalled();
    }));
});
