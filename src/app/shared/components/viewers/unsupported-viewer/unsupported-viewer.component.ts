import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-unsupported-viewer',
  templateUrl: './unsupported-viewer.component.html',
  styleUrls: ['./unsupported-viewer.component.scss']
})
export class UnsupportedViewerComponent implements OnInit {
  @Input() url: string;

  constructor() { }

  ngOnInit() {
  }
}
