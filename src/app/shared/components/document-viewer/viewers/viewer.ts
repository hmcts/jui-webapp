import {EventEmitter} from '@angular/core';

export interface Viewer {
  url: string;
  originalUrl: string;
  page: number;
  numPages: number;
  pageChanged: EventEmitter<number>;
  afterLoadComplete: EventEmitter<any>;
  prevPage();
  nextPage();
}
