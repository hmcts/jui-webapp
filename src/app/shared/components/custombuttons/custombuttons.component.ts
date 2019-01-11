import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custombuttons',
  templateUrl: './custombuttons.component.html'
})
export class CustombuttonsComponent {
  @Input() label;
}
