import { inject, TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import { LoaderInterceptorServiceMock } from './loader.interceptor.service.mock';
import { LoaderInterceptor } from './loader.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderService } from './loader.service';
import { throwError } from 'rxjs';

describe(`LoaderInterceptor`, () => {
    let service: LoaderInterceptorServiceMock;
    let httpMock: HttpTestingController;
    let loaderService: LoaderService;
    let state;
    let httpRequest;
    let subscription;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                LoaderInterceptorServiceMock,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: LoaderInterceptor,
                    multi: true,
                },
            ],
        });

        service = TestBed.get(LoaderInterceptorServiceMock);
        httpMock = TestBed.get(HttpTestingController);
        loaderService = TestBed.get(LoaderService);

        state = false;
        loaderService.isLoading.subscribe( loading => state = loading);
    });

    it('should set the loading state to true upon one or more waiting requests', () => {
        subscription = service.getMock().subscribe();
        httpRequest = httpMock.expectOne(`/test`);

        // fire off another request, so more than 1 in the queue
        service.getMock().subscribe();
        httpMock.expectOne(`/test`);

        // complete the first request
        httpRequest.flush(1);

        expect(state).toBeTruthy();
    });

    it('should set the loading state to false after all requests complete', () => {
        subscription = service.getMock().subscribe();
        httpRequest = httpMock.expectOne(`/test`);

        // fire another request whilst first is waiting
        service.getMock().subscribe(response => {
            expect(response).toBeTruthy();
        });
        const httpRequest2 = httpMock.expectOne(`/test`);

        httpRequest.flush(1);
        expect(state).toBeTruthy();

        httpRequest2.flush(1);
        expect(state).not.toBeTruthy();
    });

     it('should set the loading state to false if request errors', inject(
        [HTTP_INTERCEPTORS],
        (interceptors) => {
            const loaderInterceptor: LoaderInterceptor = interceptors.find( interceptor => interceptor instanceof LoaderInterceptor);
            const httpRequestSpy = jasmine.createSpyObj('HttpRequest', ['doesNotMatter']);
            const httpHandlerSpy = jasmine.createSpyObj('HttpHandler', ['handle']);
            httpHandlerSpy.handle.and.returnValue(throwError(
                {error:
                        {message: 'test-error'}
                }
            ));
            loaderInterceptor.intercept(httpRequestSpy, httpHandlerSpy)
                .subscribe(
                    result => expect(result).toBeTruthy(),
                    error => expect(error).toBeTruthy()
                );
            expect(state).not.toBeTruthy();
        }
    ));

    it('should set the loading state to false if request is cancelled', () => {
        subscription = service.getMock().subscribe();
        httpRequest = httpMock.expectOne(`/test`);
        subscription.unsubscribe();
        expect(state).not.toBeTruthy();
    });
});
