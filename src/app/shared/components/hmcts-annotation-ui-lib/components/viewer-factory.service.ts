import {ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef} from '@angular/core';
import {AnnotationPdfViewerComponent} from '../../hmcts-annotation-ui-lib/components/annotation-pdf-viewer/annotation-pdf-viewer.component';
import {AnnotationStoreService} from '../../hmcts-annotation-ui-lib/data/annotation-store.service';
import {IAnnotationSet} from '../../hmcts-annotation-ui-lib/data/annotation-set.model';
import { ImageViewerComponent } from '../../hmcts-annotation-ui-lib/components/image-viewer/image-viewer.component';
import { UnsupportedViewerComponent } from '../../hmcts-annotation-ui-lib/components/unsupported-viewer/unsupported-viewer.component';
import { UrlFixerService } from '../data/url-fixer.service';

@Injectable()
export class ViewerFactoryService {

    constructor(private componentFactoryResolver: ComponentFactoryResolver,
                private annotationStoreService: AnnotationStoreService,
                private urlFixer: UrlFixerService) {
    }

    private static determineComponent(mimeType: string) {
        if (ViewerFactoryService.isImage(mimeType)) {
            return ImageViewerComponent;
        }
        return UnsupportedViewerComponent;
    }

    private static isImage(mimeType: String) {
        return mimeType.startsWith('image/');
    }

    private static isPdf(mimeType: String) {
        return mimeType === 'application/pdf';
    }

    private static getDocumentId(documentMetaData: any) {
        const docArray = documentMetaData._links.self.href.split('/');
        return docArray[docArray.length - 1];
    }

    buildAnnotateUi(documentMetaData: any, viewContainerRef: ViewContainerRef, baseUrl: string,
                    annotate: boolean, annotationSet: IAnnotationSet): ComponentRef<any>['instance'] {

        viewContainerRef.clear();
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AnnotationPdfViewerComponent);

        const componentRef: ComponentRef<any> = viewContainerRef.createComponent(componentFactory);
        componentRef.instance.annotate = annotate;
        componentRef.instance.annotationSet = annotationSet;
        componentRef.instance.dmDocumentId = ViewerFactoryService.getDocumentId(documentMetaData);
        componentRef.instance.outputDmDocumentId = null; // '4fbdde23-e9a7-4843-b6c0-24d5bf2140ab';
        componentRef.instance.baseUrl = baseUrl;
        componentRef.instance.url = this.urlFixer.fixDm(documentMetaData._links.binary.href, baseUrl);

        return componentRef.instance;
    }

    buildViewer(documentMetaData: any, annotate: boolean, viewContainerRef: ViewContainerRef, baseUrl: string) {
        if (ViewerFactoryService.isPdf(documentMetaData.mimeType) && annotate) {
            const dmDocumentId = ViewerFactoryService.getDocumentId(documentMetaData);
            this.annotationStoreService.fetchData(baseUrl, dmDocumentId).subscribe((response) => {
                return this.buildAnnotateUi(documentMetaData, viewContainerRef, baseUrl, annotate, response.body);
            });

        } else if (ViewerFactoryService.isPdf(documentMetaData.mimeType) && !annotate) {
            return this.buildAnnotateUi(documentMetaData, viewContainerRef, baseUrl, annotate, null);
        } else if (ViewerFactoryService.isImage(documentMetaData.mimeType)) {

            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ImageViewerComponent);
            viewContainerRef.clear();

            const componentRef: ComponentRef<any> = viewContainerRef.createComponent(componentFactory);
            componentRef.instance.originalUrl = documentMetaData._links.self.href;
            componentRef.instance.url = this.urlFixer.fixDm(documentMetaData._links.binary.href, baseUrl);
            return componentRef.instance;
        } else {
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(UnsupportedViewerComponent);
            viewContainerRef.clear();

            const componentRef: ComponentRef<any> = viewContainerRef.createComponent(componentFactory);
            componentRef.instance.originalUrl = documentMetaData._links.self.href;
            componentRef.instance.url = this.urlFixer.fixDm(documentMetaData._links.binary.href, baseUrl);
            return componentRef.instance;
        }
    }

}
