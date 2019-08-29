import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { DataService } from './data.service';
import { LoaderInterceptor } from './loader.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

describe(`AuthHttpInterceptor`, () => {
    let service: DataService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                DataService,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: LoaderInterceptor,
                    multi: true,
                },
            ],
        });

        service = TestBed.get(DataService);
        httpMock = TestBed.get(HttpTestingController);
    });
});
