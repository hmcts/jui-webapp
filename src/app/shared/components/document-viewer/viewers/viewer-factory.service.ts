import {ComponentFactoryResolver, ComponentRef, EventEmitter, Injectable, Output, ViewContainerRef} from '@angular/core';
import {PdfViewerComponent} from './pdf-viewer/pdf-viewer.component';
import {ImgViewerComponent} from './img-viewer/img-viewer.component';
import {Viewer} from './viewer';
import {UnsupportedViewerComponent} from './unsupported-viewer/unsupported-viewer.component';
import {UrlFixerService} from '../url-fixer.service';

@Injectable()
export class ViewerFactoryService {

    afterLoadComplete = new EventEmitter<any>();

    private static determineComponent(mimeType: string, annotate: boolean) {
        if (ViewerFactoryService.isImage(mimeType)) {
            return ImgViewerComponent;
        }
        if (ViewerFactoryService.isPdf(mimeType)) {
            return PdfViewerComponent;
        }
        return UnsupportedViewerComponent;
    }

    private static isImage(mimeType: String) {
        return mimeType.startsWith('image/');
    }

    private static isPdf(mimeType: String) {
        return mimeType === 'application/pdf';
    }

    constructor(private componentFactoryResolver: ComponentFactoryResolver,
                private urlFixer: UrlFixerService) {
    }

    buildViewer(documentMetaData: any, annotate: boolean, viewContainerRef: ViewContainerRef, baseUrl: string) {
        const componentToBuild =
            ViewerFactoryService.determineComponent(documentMetaData.mimeType, annotate);
        const componentFactory =
            this.componentFactoryResolver.resolveComponentFactory(componentToBuild);

        viewContainerRef.clear();

        const componentRef: ComponentRef<Viewer> = viewContainerRef.createComponent(componentFactory);
        componentRef.instance.originalUrl = documentMetaData._links.self.href;
        componentRef.instance.url = this.urlFixer.fixDm(documentMetaData._links.binary.href, baseUrl);
        componentRef.instance.afterLoadComplete.subscribe(e => this.afterLoadComplete.emit(e));
        return componentRef.instance;
    }

}
