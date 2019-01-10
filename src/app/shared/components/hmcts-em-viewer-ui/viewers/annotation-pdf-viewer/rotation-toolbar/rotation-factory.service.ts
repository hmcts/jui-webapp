import { Injectable, ComponentFactoryResolver, Injector, ApplicationRef, EmbeddedViewRef, ComponentRef } from '@angular/core';
import { RotationComponent } from './rotation.component';
import { EmLoggerService } from '../../../logging/em-logger.service';
import { RotationModel } from '../../../model/rotation-factory.model';

@Injectable()
export class RotationFactoryService {
    
    constructor(private componentFactoryResolver: ComponentFactoryResolver,
                private log: EmLoggerService,
                private injector: Injector,
                private appRef: ApplicationRef) {
            this.log.setClass('RotationFactoryService');
        }

        addToDom(rotationModel: RotationModel): ComponentRef<RotationComponent> {
            this.log.info('Adding rotate button to PDF page ' + rotationModel.pageNumber);
            const componentRef = this.componentFactoryResolver
                            .resolveComponentFactory(RotationComponent)
                            .create(this.injector);
            componentRef.instance.pageNumber = rotationModel.pageNumber;

            this.appRef.attachView(componentRef.hostView);
            const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
                .rootNodes[0] as HTMLElement;
            rotationModel.pageDom.appendChild(domElem);

            return componentRef;
        }
}
