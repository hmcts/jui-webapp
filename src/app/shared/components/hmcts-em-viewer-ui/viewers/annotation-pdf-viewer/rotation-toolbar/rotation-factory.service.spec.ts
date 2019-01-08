import { RotationFactoryService } from './rotation-factory.service';
import { EmLoggerService } from '../../../logging/em-logger.service';
import { TestBed, inject } from '@angular/core/testing';

describe('PdfService', () => {
  
    beforeEach(() => {
      TestBed.configureTestingModule({
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
});

