import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appViewerAnchor]',
})
export class ViewerAnchorDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
