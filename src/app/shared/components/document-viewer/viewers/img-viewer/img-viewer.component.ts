import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Viewer} from '../viewer';

@Component({
  selector: 'app-img-viewer',
  templateUrl: './img-viewer.component.html',
  styleUrls: ['./img-viewer.component.scss']
})
export class ImgViewerComponent implements OnInit, Viewer {
  page = 0;
  numPages = 1;

  @Input() url: string;
  @Input() originalUrl: string;
  @Output() pageChanged = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  prevPage() {}

  nextPage() {}



}
