import {Directive, EventEmitter, Output, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appViewerAnchor]',
})
export class ViewerAnchorDirective {

  @Output() afterLoadComplete = new EventEmitter<any>();
  constructor(public viewContainerRef: ViewContainerRef) { }

}
