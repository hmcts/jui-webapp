import { RotationFactoryService } from './rotation-factory.service';
import { EmLoggerService } from '../../../logging/em-logger.service';
import { TestBed, inject } from '@angular/core/testing';
import { RotationModel } from '../../../model/rotation-factory.model';
import { HmctsEmViewerUiModule } from '../../../hmcts-em-viewer-ui.module';

describe('PdfService', () => {
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HmctsEmViewerUiModule],
          providers: [
          EmLoggerService,
          RotationFactoryService
        ]
      });
    });
  
    describe('constructor', () => {
      it('should be created', inject([RotationFactoryService], (service: RotationFactoryService) => {
        expect(service).toBeTruthy();
      }));
    });

    describe('addTODom', () => {
      it('should create rotation buttons and add to the dom', inject([RotationFactoryService], (service: RotationFactoryService) => {
        const rotationModel = new RotationModel(1, {appendChild() {}});
        spyOn(rotationModel.pageDom, 'appendChild');
        service.addToDom(rotationModel);
        expect(rotationModel.pageDom.appendChild).toHaveBeenCalled();
      }));
    });
});

