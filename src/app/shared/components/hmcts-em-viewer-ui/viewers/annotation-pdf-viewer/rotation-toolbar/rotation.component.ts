import { Component, Input } from '@angular/core';
import { PdfService } from '../../../data/pdf.service';


@Component({
    selector: 'app-rotation-toolbar',
    templateUrl: './rotation.component.html',
    styleUrls: ['./rotation.component.scss'],
    providers: []
})
export class RotationComponent {
    @Input() page: number;
    @Input() top: number;
    @Input() left: number;

    constructor(private pdfService: PdfService) {
    }

    calculateRotation(rotateVal): number {
        if (rotateVal >= 0) {
            return (rotateVal >= 360) ? rotateVal - 360 : rotateVal;
        } else {
            return 360 - Math.abs(rotateVal);
        }
    }

    onRotateClockwise() {
        const RENDER_OPTIONS = this.pdfService.getRenderOptions();
        const rotation = RENDER_OPTIONS.rotationPages
            .find(rotatePage => rotatePage.page === this.page).rotate;
        RENDER_OPTIONS.rotationPages
            .find(rotatePage => rotatePage.page === this.page).rotate = this.calculateRotation(rotation + 90);
        this.pdfService.setRenderOptions(RENDER_OPTIONS);
        this.pdfService.render();
    }
    
     onRotateAntiClockwise() {
        const RENDER_OPTIONS = this.pdfService.getRenderOptions();
        const rotation = RENDER_OPTIONS.rotationPages
            .find(rotatePage => rotatePage.page === this.page).rotate;
        RENDER_OPTIONS.rotationPages
            .find(rotatePage => rotatePage.page === this.page).rotate = this.calculateRotation(rotation - 90);
        this.pdfService.setRenderOptions(RENDER_OPTIONS);
        this.pdfService.render();
    }
}
