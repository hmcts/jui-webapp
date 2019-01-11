import { Component, Input, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { EmLoggerService } from '../../logging/em-logger.service';

@Component({
    selector: 'app-image-viewer',
    templateUrl: './image-viewer.component.html',
    styleUrls: ['./image-viewer.component.scss'],
})
export class ImageViewerComponent implements OnInit {
    
    @Input() url: string;
    @Input() originalUrl: string;

    @ViewChild('img') img: ElementRef;
    rotation: number;

    constructor(private renderer: Renderer2,
                private log: EmLoggerService) {
        this.log.setClass('ImageViewerComponent');
    }

    ngOnInit() {
        this.rotation = 0;
    }

    onRotateClockwise() {
        this.rotation = this.rotation + 90;
        this.rotateImage();
    }

    onRotateAntiClockwise() {
        this.rotation = this.rotation - 90;
        this.rotateImage();
    }

    rotateImage() {
        this.log.info('rotating to-' + this.rotation + 'degrees');
        const styles = ['transform', '-ms-transform', '-o-transform', '-moz-transform', '-webkit-transform'];
        for (const style of styles) {
            this.renderer.setStyle(this.img.nativeElement, style, `rotate(${this.rotation}deg)`);
        }
    }
}
