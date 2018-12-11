import { Injectable, ComponentFactoryResolver, Injector, ApplicationRef, EmbeddedViewRef } from '@angular/core';
import { RotationComponent } from './annotation-pdf-viewer/rotation-toolbar/rotation.component';

@Injectable()
export class RotationFactoryService {
    
    constructor(private componentFactoryResolver: ComponentFactoryResolver,
                private injector: Injector,
                private appRef: ApplicationRef) {
        }

        addToDom(pageNumber: number, rect: any) {
            const componentRef = this.componentFactoryResolver
                            .resolveComponentFactory(RotationComponent)
                            .create(this.injector);
            componentRef.instance.page = pageNumber;
            componentRef.instance.top = rect.top;
            componentRef.instance.left = rect.left;
            this.appRef.attachView(componentRef.hostView);
            const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
                .rootNodes[0] as HTMLElement;
            document.body.appendChild(domElem);
        }
}
