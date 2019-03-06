import { RotationService } from './rotation.service';
import { TestBed, inject } from '@angular/core/testing';
import { HmctsEmViewerUiModule } from '../../../hmcts-em-viewer-ui.module';

describe('RotationService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HmctsEmViewerUiModule],
            providers: [
                RotationService
            ]
        });
    });

    describe('getShowRotationSub', () => {
        it('should return show rotation', inject([RotationService], (service: RotationService) => {
            const showRotation = service.getShowRotationSub();
            const value = showRotation.getValue();

            expect(value).toBeFalsy();
        }));
    });

    describe('toggleRotation', () => {
        it('should change the value of the boolean', inject([RotationService], (service: RotationService) => {
            service.toggleRotation();

            const value = service.getShowRotationSub().getValue();
            expect(value).toBeTruthy();
        }));
    });
});
