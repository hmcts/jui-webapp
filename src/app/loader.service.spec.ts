import {inject, TestBed} from '@angular/core/testing';
import { LoaderService } from './loader.service';

describe('Service: LoaderService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
            ],
            providers: [
                LoaderService
            ]
        });
    });
    it('should be created', inject([LoaderService], (service: LoaderService) => {
        expect(service).toBeTruthy();
    }));

    it('should have initial loading state of false', inject([LoaderService], (service: LoaderService) => {
        service.isLoading.subscribe( loading => {
            expect(loading).toBeFalsy();
        });
    }));
});
