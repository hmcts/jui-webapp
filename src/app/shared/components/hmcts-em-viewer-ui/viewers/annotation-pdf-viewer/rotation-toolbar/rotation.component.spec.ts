import { RotationComponent } from './rotation.component';
import { EmLoggerService } from '../../../logging/em-logger.service';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { PdfRenderService } from '../../../data/pdf-render.service';
import { RenderOptions } from '../../../data/js-wrapper/renderOptions.model';

class MockPdfRenderService {
  getRenderOptions() {}
  setRenderOptions() {}
  render() {}
}

describe('RotationComponent', () => {
    let component: RotationComponent;
    let fixture: ComponentFixture<RotationComponent>;
    const mockPdfRenderService = new MockPdfRenderService();

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ RotationComponent ],
        providers: [
          EmLoggerService,
          { provide: PdfRenderService, useFactory: () => mockPdfRenderService },
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(RotationComponent);
      component = fixture.componentInstance;
      component.pageNumber = 1;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    describe('calculateRotation', () => {

        it('should return the sum value of current rotation and new rotation', () => {
            const rotationAdd = 90;
            const rotation = component.calculateRotation(rotationAdd);
            expect(rotation).toBe(rotationAdd);
        });

        it('should return 360 degrees as 0', () => {
            const rotationAdd = 360;
            const rotation = component.calculateRotation(rotationAdd);
            expect(rotation).toBe(0);
        });

        it('should rotation in 360 degrees', () => {
            const rotationValue = 450;
            const rotation = component.calculateRotation(rotationValue);
            expect(rotation).toBe(90);
        });

        it('should return rotation in 360 degrees if negative', () => {
            const rotationSubstract = -90;
            const rotation = component.calculateRotation(rotationSubstract);
            expect(rotation).toBe(270);
        });
  });


  describe('onRotateClockwise', () => {
    const renderOptions = new RenderOptions(null, null, 1.33, 0, [{page: 1, rotate: 0}] );

    it('should add 90 degrees to the rotation option', () => {
      spyOn(mockPdfRenderService, 'getRenderOptions').and.returnValue(renderOptions);
      spyOn(mockPdfRenderService, 'setRenderOptions').and.callFake((returnedRenderOptions: RenderOptions) => {
        expect(returnedRenderOptions.rotationPages.find(pageDetails => pageDetails.page === 1).rotate).toBe(90);
      });
      component.onRotateClockwise();
    });

    it('should set modified render options', () => {
      spyOn(mockPdfRenderService, 'getRenderOptions').and.returnValue(renderOptions);
      spyOn(mockPdfRenderService, 'setRenderOptions').and.stub();
      component.onRotateClockwise();
      expect(mockPdfRenderService.setRenderOptions).toHaveBeenCalledWith(renderOptions);
    });

    it('should call render', () => {
      spyOn(mockPdfRenderService, 'getRenderOptions').and.returnValue(renderOptions);
      spyOn(mockPdfRenderService, 'render').and.stub();
      component.onRotateClockwise();
      expect(mockPdfRenderService.render).toHaveBeenCalled();
    });
  });

  describe('onRotateAntiClockwise', () => {
    const renderOptions = new RenderOptions(null, null, 1.33, 0, [{page: 1, rotate: 0}] );

    it('should subtract 90 degrees to the rotation option', () => {
      spyOn(mockPdfRenderService, 'getRenderOptions').and.returnValue(renderOptions);
      spyOn(mockPdfRenderService, 'setRenderOptions').and.callFake((returnedRenderOptions: RenderOptions) => {
        expect(returnedRenderOptions.rotationPages.find(pageDetails => pageDetails.page === 1).rotate).toBe(270);
      });
      component.onRotateAntiClockwise();
    });

    it('should set modified render options', () => {
      spyOn(mockPdfRenderService, 'getRenderOptions').and.returnValue(renderOptions);
      spyOn(mockPdfRenderService, 'setRenderOptions').and.stub();
      component.onRotateAntiClockwise();
      expect(mockPdfRenderService.setRenderOptions).toHaveBeenCalledWith(renderOptions);
    });

    it('should call render', () => {
      spyOn(mockPdfRenderService, 'getRenderOptions').and.returnValue(renderOptions);
      spyOn(mockPdfRenderService, 'render').and.stub();
      component.onRotateAntiClockwise();
      expect(mockPdfRenderService.render).toHaveBeenCalled();
    });
  });
});

