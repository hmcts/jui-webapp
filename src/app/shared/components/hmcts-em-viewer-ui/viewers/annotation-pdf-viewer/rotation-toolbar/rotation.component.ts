import {Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import { PdfRenderService } from '../../../data/pdf-render.service';
import { EmLoggerService } from '../../../logging/em-logger.service';
import {Subscription} from 'rxjs';


@Component({
    selector: 'app-rotation-toolbar',
    templateUrl: './rotation.component.html',
    styleUrls: ['./rotation.component.scss'],
    providers: []
})
export class RotationComponent implements OnInit, OnDestroy {
    @Input() pageNumber: number;
    @ViewChild('rotationButton') rotationButton: ElementRef

    constructor(private pdfRenderService: PdfRenderService,
                private log: EmLoggerService,
                private renderer: Renderer2) {
        this.log.setClass('RotationComponent');
    }

        this.renderer.setStyle(this.rotationButton.nativeElement, 'margin-top',
            '-' + (<HTMLElement>document.getElementById('pageContainer' + this.pageNumber).querySelector('.textLayer')).style.height);
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
}
