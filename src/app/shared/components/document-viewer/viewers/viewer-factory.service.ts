import {ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef} from '@angular/core';
import {ImgViewerComponent} from './img-viewer/img-viewer.component';
import {Viewer} from './viewer';
import {UnsupportedViewerComponent} from './unsupported-viewer/unsupported-viewer.component';
import {UrlFixerService} from '../url-fixer.service';
import {AnnotationPdfViewerComponent} from '../../hmcts-annotation-ui-lib/components/annotation-pdf-viewer/annotation-pdf-viewer.component';
import {AnnotationStoreService} from '../../hmcts-annotation-ui-lib/data/annotation-store.service';
import {NpaService} from '../../hmcts-annotation-ui-lib/data/npa.service';
import {IAnnotationSet} from '../../hmcts-annotation-ui-lib/data/annotation-set.model';

@Injectable()
export class ViewerFactoryService {

    private static determineComponent(mimeType: string, annotate: boolean) {
        if (ViewerFactoryService.isImage(mimeType)) {
            return ImgViewerComponent;
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

    constructor(private componentFactoryResolver: ComponentFactoryResolver,
                private annotationStoreService: AnnotationStoreService,
                private urlFixer: UrlFixerService) {
    }

    buildAnnotateUi(documentMetaData: any, viewContainerRef: ViewContainerRef, baseUrl: string,
                    annotate: boolean, annotationSet: IAnnotationSet): ComponentRef<any>['instance'] {

        viewContainerRef.clear();
        const componentFactory =
            this.componentFactoryResolver.resolveComponentFactory(AnnotationPdfViewerComponent);

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
            // this.npaService.documentTask.subscribe( documentTask => {
            //         console.log(documentTask);
            // });
            const dmDocumentId = ViewerFactoryService.getDocumentId(documentMetaData);

            this.annotationStoreService.fetchData(baseUrl, dmDocumentId).subscribe((response) => {
                return this.buildAnnotateUi(documentMetaData, viewContainerRef, baseUrl, annotate, response.body);
            });
        } else if (ViewerFactoryService.isPdf(documentMetaData.mimeType) && !annotate) {
            return this.buildAnnotateUi(documentMetaData, viewContainerRef, baseUrl, annotate, null);
        } else {
            const componentToBuild =
                ViewerFactoryService.determineComponent(documentMetaData.mimeType, annotate);
            const componentFactory =
                this.componentFactoryResolver.resolveComponentFactory(componentToBuild);

            viewContainerRef.clear();

            const componentRef: ComponentRef<Viewer> = viewContainerRef.createComponent(componentFactory);
            componentRef.instance.originalUrl = documentMetaData._links.self.href;
            componentRef.instance.url = this.urlFixer.fixDm(documentMetaData._links.binary.href, baseUrl);
            return componentRef.instance;
        }
    }

}
