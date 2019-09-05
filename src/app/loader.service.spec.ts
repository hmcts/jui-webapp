import {TestBed} from '@angular/core/testing';
import { LoaderService } from './loader.service';

describe('Service: LoaderService', () => {

    let service: LoaderService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
            ],
            providers: [
                LoaderService
            ]
        });

        service = TestBed.get(LoaderService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should have initial loading state of false', () => {
        service.isLoading.subscribe( loading => {
            expect(loading).toBeFalsy();
        });
    });

    it('should emit the correct values before subscription', () => {
        service.isLoading.next(true);
        service.isLoading.subscribe( loading => {
            expect(loading).toBeTruthy();
        });
    });
});
