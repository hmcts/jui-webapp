import { EmLoggerService } from './em-logger.service';
import { TestBed, inject } from '@angular/core/testing';

describe('EmLoggerService', () => {
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          EmLoggerService,
        ]
      });
    });
  
    describe('constructor', () => {
      it('should be created', inject([EmLoggerService], (service: EmLoggerService) => {
        expect(service).toBeTruthy();
      }));
    });

    describe('setClass', () => {
        it('should set the logged class', inject([EmLoggerService], (service: EmLoggerService) => {
            service.setClass('myClassName');
            expect(service['loggingClass']).toBe('myClassName');
        }));
    });

    describe('error', () => {
        it('should prepend error to the message', inject([EmLoggerService], (service: EmLoggerService) => {
            spyOn(service, 'buildLog').and.callFake(message => {
                expect(message).toContain('error');
            });
            service.error('mymessage');
        }));
    });

    describe('info', () => {
        it('should prepend info to the message', inject([EmLoggerService], (service: EmLoggerService) => {
            spyOn(service, 'buildLog').and.callFake(message => {
                expect(message).toContain('info');
            });
            service.info('mymessage');
        }));
    });

    describe('buildLog', () => {
        it('should prepend info to the message', inject([EmLoggerService], (service: EmLoggerService) => {
            spyOn(console, 'log');
            service.buildLog('mymessage');
            expect(console.log).toHaveBeenCalled();
        }));
    });
});
