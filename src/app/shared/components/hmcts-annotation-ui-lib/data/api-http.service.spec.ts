import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ApiHttpService } from './api-http.service';

fdescribe('ApiHttpService', () => {
    let httpMock: HttpTestingController;
    let apiHttpService: ApiHttpService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
              ApiHttpService,
            ],
            imports: [
                HttpClientTestingModule
            ]
        });
      });

      apiHttpService = TestBed.get(ApiHttpService);
      httpMock = TestBed.get(HttpTestingController);

    it('should set base URL', (done) => {
        apiHttpService.setBaseUrl('testUrl');
        expect(apiHttpService.getBaseUrl()).toBe('testUrl');

        httpMock.verify();
    });
});
