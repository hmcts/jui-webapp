import { Component, Input } from '@angular/core';
import { PdfRenderService } from '../../../data/pdf-render.service';
import { EmLoggerService } from '../../../logging/em-logger.service';


@Component({
    selector: 'app-rotation-toolbar',
    templateUrl: './rotation.component.html',
    styleUrls: ['./rotation.component.scss'],
    providers: []
})
export class RotationComponent {
    @Input() pageNumber: number;

    constructor(private pdfRenderService: PdfRenderService,
                private log: EmLoggerService) {
        this.log.setClass('RotationComponent');
    }

    calculateRotation(rotateVal): number {
        const circleDegrees = 360;
        return (rotateVal % circleDegrees + circleDegrees) % circleDegrees;
    }

    onRotateClockwise() {
        const RENDER_OPTIONS = this.pdfRenderService.getRenderOptions();
        const rotation = RENDER_OPTIONS.rotationPages
            .find(rotatePage => rotatePage.page === this.pageNumber).rotate;
        RENDER_OPTIONS.rotationPages
            .find(rotatePage => rotatePage.page === this.pageNumber).rotate = this.calculateRotation(rotation + 90);
        this.pdfRenderService.setRenderOptions(RENDER_OPTIONS);
        this.pdfRenderService.render();
    }
    
     onRotateAntiClockwise() {
        const RENDER_OPTIONS = this.pdfRenderService.getRenderOptions();
        const rotation = RENDER_OPTIONS.rotationPages
            .find(rotatePage => rotatePage.page === this.pageNumber).rotate;
        RENDER_OPTIONS.rotationPages
            .find(rotatePage => rotatePage.page === this.pageNumber).rotate = this.calculateRotation(rotation - 90);
        this.pdfRenderService.setRenderOptions(RENDER_OPTIONS);
        this.pdfRenderService.render();
    }
}
