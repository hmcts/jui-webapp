import { TestBed, inject } from '@angular/core/testing';
import { ApiHttpService } from './api-http.service';
import { NpaService } from './npa.service';

class MockApiHttpService {
    documentTask() {}
}

// describe('NpaService' , () => {

//     const mockApiHttpService = new MockApiHttpService();
//     beforeEach(() => {
//         TestBed.configureTestingModule({
//           providers: [
//               NpaService,
//               { provide: ApiHttpService, useFactory: () => mockApiHttpService} 
//             ]
//         });
//       });

//     it('should be created', inject([NpaService], (service: NpaService) => {
//         expect(service).toBeTruthy();
//     }));

//     it('should invoke the http service to send document task', inject([NpaService], (service: NpaService) => {
//         spyOn(mockApiHttpService, 'documentTask');
//         service.exportPdf('dmDocumentId', 'outputDocumentId');
//         expect(mockApiHttpService.documentTask).toHaveBeenCalled();
//     }));
// });
