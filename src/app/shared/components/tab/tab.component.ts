import { Component, Input } from '@angular/core';

@Component({
  selector: 'cut-tab',
  templateUrl: './tab.component.html'
})
export class TabComponent {

  @Input()
  public id: string;

  @Input()
  public title: string;

  public selected: boolean = false;

}
