import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent implements OnInit {
  @Input() url: string;

  constructor() { }

  ngOnInit() {
  }
}
